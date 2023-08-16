"use client"
import React,{ useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo } from '@/feactures/todoslice';
import { sortTodos } from '../../../utils/sortTodo';

const Table = ({
    searchQuery,
    handleSearch,
    filteredTodos,
    currentPage,
    countPerPage,
    handledelete,
    // openUpdateForm,
    itemsData,
    isUpdate,
    setIsUpdate,
    setItemData
}) => {
    const [todos,setTodos]=useState();

    useEffect(()=>{
const fetchTodos=async () => {
    const res=await fetch('http://localhost:8000/api/todos');
    const result =await res.json();
    // console.log(res)
     setTodos(result?.result)
}
fetchTodos();
    },[todos])

    
    const dispatch = useDispatch();

    const handleEditInputChange = (event) => {
        const updatedTitle = event.target.value;
        setItemData({ ...itemsData, title: updatedTitle });
    };

    const handleEditInputBlur = async (id, title) => {
        try {
            await fetch(`http://localhost:8000/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            setIsUpdate(false);
        } catch (error) {
            console.error('Error updating todo:', error);
            // Handle error or provide user feedback
        }
    };

    const [sortOrder, setSortOrder] = useState("asc");

    const handleSortChange = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    };

    const sortedTodos = sortTodos(filteredTodos, sortOrder);


    const openUpdateForm = (id, title) => {
        setItemData({ id, title });
        setIsUpdate(true);
    };


    return (
        <div className="w-2/3 mx-auto my-20">
            <div className="bg-white shadow-md rounded my-6">
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search..."
                    onChange={handleSearch}
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none mb-4"
                />
                <table className="text-left w-full border-collapse">
                    <thead className="">
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                                Title
                                <button
                                    className="ml-2 focus:outline-none"
                                    onClick={handleSortChange}
                                >
                                    {sortOrder === "asc" ? "▲" : "▼"}
                                </button>
                            </th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        
                        // sortedTodos.slice(currentPage * countPerPage, (currentPage + 1) * countPerPage)
                       todos && todos.map((item) => (
                            <tr className="hover:bg-grey-lighter" key={item.id}>
                                <td className="py-4 px-6 text-xl border-b border-grey-light">
                                    {isUpdate && itemsData.id === item.id ? (
                                        <input
                                            type="text"
                                            value={itemsData.title}
                                            onChange={handleEditInputChange}
                                            onClick={() => handleEditInputBlur(item.id, item.title)}
                                            autoFocus
                                        />
                                    ) : (
                                        item.title
                                    )}
                                </td>
                                <td className="py-4 px-6 flex border-b border-grey-light">
                                    {isUpdate && itemsData.id === item.id ? (
                                        <div className="border bg-blue-300 py-2 font-bold px-3 rounded cursor-pointer hover:bg-blue-100" onClick={() => handleEditInputBlur(item.id, itemsData.title)}>
                                            Save
                                        </div>
                                    ) : (
                                        <a href="#" className="border bg-green-500 py-2 font-bold px-4 rounded cursor-pointer hover:bg-green-300" onClick={() => openUpdateForm(item.id, item.title)}>
                                            Edit
                                        </a>
                                    )}
                                    <div className="border bg-red-500 py-2 font-bold px-3 rounded cursor-pointer hover:bg-red-300" onClick={() => handledelete(item.id)}>
                                        Delete
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
