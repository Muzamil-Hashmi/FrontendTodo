"use client"
import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtodos, deleteTodo } from '../../feactures/todoslice';
import { v4 as uuidv4 } from 'uuid';

import Form from './Form';
import Table from './Table';
import Pagination from './pagination';

const Home = () => {
    const todos = useSelector((state) => state.todo.todo);
    const [input, setInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const countPerPage = 5;
///////////////////Frondend only//////////////////////////////////
    // const dispatch = useDispatch();

    // const handleadd = () => {
    //     dispatch(addtodos({ id: uuidv4(), title: input }));
    //     setInput("");
    // };
    /////////////////////////backend//////////////////////////////
      const handleadd = async () => {
        try {
            const submitData = await fetch('http://localhost:8000/api/todos', {
                method: 'POST',
                body: JSON.stringify({ title: input }),
                headers: { "content-type": "application/json" },
            });
            if(submitData.ok){
                setInput('')
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };
    ////////////////////////////////////////////////////////////////

    // const handledelete = (id) => {
    //     dispatch(deleteTodo(id));
    //     setSearchQuery("");
    // };
    /////////////////////BackEnd delete ///////////////////

    const handledelete = async (id) =>{
      try{
        const responce= await fetch(`http://localhost:8000/api/todos/${id}`,{
            method: "DELETE"
        });
      }
      catch (error){
        console.error('Error deleting todo:', error);

      }
       
    }
    ////////////////////////////////////////////////////////////

    const [itemsData, setItemData] = useState({ id: "", title: "" });
    const [isUpdate, setIsUpdate] = useState(false);

    // const openUpdateForm = (id, title) => {
    //     setItemData({ id, title });
    //     setIsUpdate(true);

    //     // Close edit mode for all items except the one being edited
    //     const updatedEditModeItems = {};
    //     todos.forEach((item) => {
    //         updatedEditModeItems[item.id] = item.id === id;
    //     });
    //     setEditModeItems(updatedEditModeItems);

    //     setSearchQuery("");
    // };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(0); // Reset current page on search
    };

    const filteredTodos = todos.filter((item) =>
        typeof item.title === 'string' && item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredTodos.length / countPerPage);

    return (
        <>
            <div className='my-10'>
                <Form
                    input={input}
                    setInput={setInput}
                    handleadd={handleadd}
                />

                <Table
                    searchQuery={searchQuery}
                    handleSearch={handleSearch}
                    filteredTodos={filteredTodos}
                    currentPage={currentPage}
                    countPerPage={countPerPage}
                    handledelete={handledelete}
                    itemsData={itemsData}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    setItemData={setItemData}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    );
};

export default Home;
