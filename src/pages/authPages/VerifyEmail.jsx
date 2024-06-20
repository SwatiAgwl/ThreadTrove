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
    <div>
        <div className='h-screen flex flex-col gap-2 justify-center items-center '>
            <h2 className='text-2xl'>Verify Email</h2>
            <p>A verification code has been sent to you.Enter the code below</p>
            {/* <input
            required
            type='text'
            name= 'otp'
            value={otp}
            onChange={changeHandler}
            placeholder='otp'
            ></input> */}
            <OTPInput className='bg bg-slate-500'
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} placeholder='_'/>}></OTPInput>
            <button onClick={clickHandler} className='border border-black-2 py-1 px-4'>Submit</button>

            <button onClick={()=> dispatch(sendOtp(signupData.email,navigate))}>Resend otp</button>
        </div>
         
    </div>
  )
}
