import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {login} from '../../services/operations/authapi'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const LoginPage = () => {
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const [loginData,setloginData]= useState({
        email:"",
        password: ""
    })
    function changeHandler(e){
        const {name,value}= e.target;
        setloginData(prevData =>(
            {
                ...prevData,
                [name]: value
            }
        ))
    }
    //const {token}= useSelector((state)=> state.auth);
    const {user}= useSelector((state)=> state.user);

    const{ email, password}= loginData;
    function submitHandler(e){
        e.preventDefault();
        dispatch(login(email,password,navigate));
        
        // console.log("user",user);
        // user.isAdmin? (navigate('/admin/dashboard')): (navigate('/'))
        
        //navigate('/');
    }
    useEffect(() => {
        if (user) {
            console.log("user", user);
            if (user.isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }
    }, [user, navigate]);



    return (
        <div className='min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100'>
          <div className='w-11/12 md:w-2/3 lg:w-1/3 bg-white rounded-lg shadow-lg p-8 md:p-12'>
            <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6'>Login</h2>
            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
              <input
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200'
                required
                type='email'
                onChange={changeHandler}
                name='email'
                value={loginData.email}
                placeholder='E-mail'
              />
              <input
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200'
                required
                type='password'
                onChange={changeHandler}
                name='password'
                value={loginData.password}
                placeholder='Password'
                // minLength={5}
              />
              <button className='w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-3 rounded-lg transition duration-200'>
                Login
              </button>
            </form>
            <div className='flex flex-row justify-between text-sm text-gray-600 mt-4'>
              <Link to='/reset-password' className='hover:underline'>
                Forgot password?
              </Link>
              <div className='flex flex-row gap-1'>
                <p>New user?</p>
                <Link to='/signup' className='text-blue-600 hover:underline'>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    };