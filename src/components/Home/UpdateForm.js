"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useDispatch } from 'react-redux/es/exports'

import { useSearchParams } from 'next/navigation'
import { updateTodo } from '@/feactures/todoslice'

const UpdateForm = () => {
    const searchParams = useSearchParams()
    console.log("name", useSearchParams)


    const query = new URLSearchParams(searchParams)
    const id = query.get('id')
    const title = query.get('title')
    const [input, setInput] = useState(title);
    const navigate = useRouter()
    const dispach = useDispatch()

    const handleUpdate = () => {
        dispach(updateTodo({ id, title: input }))
        navigate.push('/')
    }
    return (
        <>


            <div className="  mt-20 flex justify-center items-center">
                <div className="py-12 px-12 bg-purple-200 rounded-2xl shadow-xl z-20">

                    <div className="space-y-4">
                        <input type="text"
                            name='name'
                            id=''
                            value={input}
                            placeholder='Add Data'
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="text-center mt-6">
                        <button className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
                            onClick={() => handleUpdate()} >
                            update</button>

                    </div>
                </div>
                <div />
            </div>


        </>)
}

export default UpdateForm