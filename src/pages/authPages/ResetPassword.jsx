import React from 'react'
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState } from 'react';
import { resetPasswordToken } from '../../services/operations/authapi';
import { useDispatch } from 'react-redux';

export const ResetPassword = () => {
    const[emailSent, setEmailSent]= useState(false);
    const [email, setEmail]= useState("");
    const dispatch= useDispatch();

    function submitHandler(e){
        e.preventDefault();
        dispatch(resetPasswordToken(email,setEmailSent));
    }
     
  return (
    <div className='flex w-full h-screen justify-center items-center bg-gray-100'>
        <div className='flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-lg shadow-md'>
            <h1  className='text-2xl font-semibold text-gray-800'>
                {
                    !emailSent? ("Reset Your Password"): ("Check Your Email")
                }
            </h1>
            <p className='text-gray-600 text-center'>
                {
                    !emailSent? ("Have no fear. We'll email you instructions to reset your password"): (`We have sent the reset email to ${email}`)
                }
            </p>
            <form onSubmit={submitHandler} className='w-full flex flex-col gap-3'>
                {
                    !emailSent && (
                        <input
                        required
                        type='email'
                        name='email'
                        value={email}
                        placeholder='E-mail'
                        onChange={(e)=> setEmail(e.target.value)}
                        className='border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500'
                        >

                        </input>
                    )
                }
                {
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75' type='submit'>
                        {
                            !emailSent? "Reset Password": "Resend Email"
                        }
                    </button>
                }
            </form>

            <Link to={'/login'} className='flex items-center text-blue-500 hover:underline mt-4' >
                <FaLongArrowAltLeft  className='mr-2'/>Back to login
            </Link>
        </div>
    </div>
  )
}
