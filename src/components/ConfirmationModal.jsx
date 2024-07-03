import React, { useState } from 'react'


export const ConfirmationModal = ({modalData}) => {
    
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-100 '>
        <div className='bg-white p-4 rounded shadow-lg z-100 '>
            <p className='text-xl font-semibold'>{modalData.text1}</p>
            <p>{modalData.text2}</p>
            <div className='flex flex-row gap-2 mt-4'>
                <button onClick={()=>{modalData.btn1handler(); modalData.btn2handler();}} className='bg-red-500 text-white px-4 py-2 rounded'>{modalData.btn1text}</button>
                <button onClick={modalData.btn2handler} className='bg-gray-300 px-4 py-2 rounded'>{modalData.btn2text}</button>
            </div>
        </div>
    </div>
  )
}
