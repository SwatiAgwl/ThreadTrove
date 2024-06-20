import React, { useEffect } from 'react'
import { useState } from 'react';


export const AddTag = ({label,getValues,setValue,name,errors,register}) => {
    const [tag,setTag]= useState("");
    const [tagList, setTagList]= useState([]);

    useEffect(()=>{
        register(name,{
            required: true, 
            // validate: value => value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name,tagList);
    },[tagList]);

    const addHandler= ()=>{
        if( tag){
        setTagList([...tagList , tag])
        setTag("");
        }
    }
    const removeHandler= (index)=>{
       const updateTagList= [...tagList];
       updateTagList.splice(index,1);
       setTagList(updateTagList);
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
                <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
                {
                    tagList.length > 0 && (
                        <ul className="space-y-2">
                            {
                                tagList.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                                    >
                                        <span className="text-gray-700">{item}</span>
                                        <button
                                            onClick={() => removeHandler(index)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                <input
                    id={name}
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Enter Tags"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type='button'
                    onClick={addHandler}
                    className="mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Add
                </button>
                {
                    errors[name] && (
                        <span className="text-red-500 text-sm mt-1">{label} is required</span>
                    )
                }
            </div>
        </div>
    );
    

}
