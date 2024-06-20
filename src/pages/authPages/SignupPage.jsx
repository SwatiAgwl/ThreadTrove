import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import {sendOtp} from '../../services/operations/authapi'
import { setSignupData } from '../../slices/authSlice';

export const SignupPage = () => {
    const navigate= useNavigate();
    const dispatch= useDispatch();

    const [formData,setformData]= useState({
        name:"",
        email:"",
        password: "",
        confirmPassword: "",
        phoneNumber:"",
    })
    function changeHandler(e){
        const {name,value}= e.target;
        setformData(prevData =>(
            {
                ...prevData,
                [name]: value
            }
        ))
    }
    function submitHandler(e){
        e.preventDefault();
        if( formData.password !== formData.confirmPassword){
            toast.error("Password don't match");
            return;
        }
        const signupData= {
            ...formData,
        }
        dispatch(setSignupData(signupData));
        console.log("email on which otp: ",formData.email);
        dispatch(sendOtp(formData.email, navigate))
        //toast.success("Account Created")
        //navigate('/');
    }
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='w-[50%]  bg-orange-100 flex flex-col gap-5 py-9 px-9'>
            <h2 className='text-4xl text-center'>Signup</h2>
         
                <form onSubmit={submitHandler} className='flex flex-col gap-3 '>
                    <input className='py-2 px-3' 
                        required 
                        type='text'
                        onChange={changeHandler} 
                        value={formData.name}
                        name='name'
                        placeholder='Name'
                    ></input>
                    <input className='py-2 px-3' 
                        required 
                        type='email' 
                        onChange={changeHandler} 
                        value={formData.email}
                        name='email'
                        placeholder='E-mail'
                    ></input>
                    <input className='py-2 px-3' 
                    required 
                        type='password'
                        onChange={changeHandler}
                        value={formData.password} 
                        name='password' 
                        placeholder='Password'
                        ></input>
                    <input className='py-2 px-3' 
                        required 
                        type='password'
                        name='confirmPassword'
                        onChange={changeHandler} 
                        value={formData.confirmPassword} 
                        placeholder='Confirm Password'></input>
                    <input className='py-2 px-3' 
                        required 
                        type='text'
                        name='phoneNumber'
                        onChange={changeHandler}
                        value={formData.phoneNumber}  
                        placeholder='Phone Number'></input>
               
                    <button className='w-full bg-blue-600 py-2 text-3xl text-white '>Create Account</button>
                 </form>
          
        </div>    
    </div>
   
  )
}
