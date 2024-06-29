import React, { useEffect } from 'react'
import {sendOtp, signup} from '../../services/operations/authapi'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'react-otp-input';

export const VerifyEmail = () => {
    const [otp, setOtp]= useState("");
    const {signupData} = useSelector((state)=> state.auth);
    console.log("sign up data ", signupData);
    const navigate= useNavigate();
    const dispatch= useDispatch();

    useEffect(()=>{
        if( !signupData){
            navigate('/signup');
        }
    },[])
    const {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber
    }= signupData;


    function clickHandler(event){
        event.preventDefault();
        dispatch(signup(name,email,password,confirmPassword,phoneNumber,otp,navigate) );
    }
  return (
    <div  className='h-screen flex flex-col justify-center items-center bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4 items-center w-[90%] md:w-[400px]'>
            <h2 className='text-2xl font-semibold'>Verify Email</h2>
            <p className='text-gray-600 text-center'>A verification code has been sent to you.Enter the code below</p>
          
            <OTPInput 
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span className="text-xl">-</span>}
                renderInput={(props) => <input {...props}
                                 placeholder='_'
                                 className='border border-gray-500 rounded-sm py-1 text-center w-14 h-10 md:w-16 md:h-10 focus:outline-none focus:ring-2 focus:ring-red-500 text-xl'
                                 />}
                 className='flex gap-2'
            >

            </OTPInput>
            <button onClick={clickHandler} className='bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition duration-300'>Submit</button>

            <button onClick={()=> dispatch(sendOtp(signupData.email,navigate))}  className='text-red-500 hover:underline'>
                Resend otp
            </button>
        </div>
         
    </div>
  )
}
