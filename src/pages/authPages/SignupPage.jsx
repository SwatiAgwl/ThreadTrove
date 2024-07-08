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
    <div className='min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100'>
      <div className='w-11/12 md:w-2/3 lg:w-1/3 bg-white rounded-lg shadow-lg p-8 md:p-12'>
        <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6'>SignUp</h2>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <input
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200'
            required
            type='text'
            onChange={changeHandler}
            value={formData.name}
            name='name'
            placeholder='Name'
          />
          <input
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200'
            required
            type='email'
            onChange={changeHandler}
            value={formData.email}
            name='email'
            placeholder='E-mail'
          />
          <input
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200'
            required
            type='password'
            onChange={changeHandler}
            value={formData.password}
            name='password'
            placeholder='Password'
            minLength={5}
          />
          <input
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200'
            required
            type='password'
            onChange={changeHandler}
            value={formData.confirmPassword}
            name='confirmPassword'
            placeholder='Confirm Password'
            minLength={5}
          />
          <input
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200'
            required
            type='text'
            onChange={changeHandler}
            value={formData.phoneNumber}
            name='phoneNumber'
            placeholder='Phone Number'
            minLength={10}
            maxLength={10}
          />
          <button className='w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 rounded-lg transition duration-200'>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}  