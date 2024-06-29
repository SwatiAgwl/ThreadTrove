import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/operations/authapi';
import { useLocation } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const UpdatePassword = () => {
    const [password,setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const dispatch= useDispatch();
    const location= useLocation();
    const {loading}= useSelector((state)=> state.auth);

    function submitHandler(e){
        e.preventDefault();
        const token= location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }
  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-100'>
         {loading ? (
            <div className="spinner"></div>
        ) : (
        <div className='w-11/12 md:w-6/12 lg:w-4/12 bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4'>
            <h1  className='text-2xl font-semibold text-center'>Choose new password</h1>
            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                <input 
                    required
                    type='password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    name='password'
                    placeholder='Password'
                    className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500'></input>
                <input
                    required
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500'
                    ></input>       

                    <button className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300'>Submit</button>
            </form>
            <Link to={'/login'}  className='text-red-500 hover:underline flex items-center mt-4'
             > <FaLongArrowAltLeft  className='mr-2' />Back to login</Link>
        </div>

        )}
    </div>
  )
}
