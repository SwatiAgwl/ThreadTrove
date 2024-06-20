import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {login} from '../../services/operations/authapi'
import { useDispatch, useSelector } from 'react-redux'

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

    const{ email, password}= loginData;
    function submitHandler(e){
        e.preventDefault();
        dispatch(login(email,password,navigate));
        //toast.success("Login Successful")
        navigate('/');
        //console.log("token",token);
    }

  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='w-[50%]  bg-orange-100 flex flex-col gap-5 py-9 px-9'>
            <h2 className='text-4xl text-center'>Login</h2>
            
                <form onSubmit={submitHandler} className='flex flex-col gap-3'>
                    <input className='py-2 px-3' 
                        required
                        type='email'
                        onChange={changeHandler}
                        name='email' 
                        value={loginData.email}
                        placeholder='E-mail'
                    >
                    </input>
                    <input className='py-2 px-3' 
                        required 
                        type='password'
                        onChange={changeHandler}
                        name='password' 
                        value={loginData.password}
                        placeholder='Password'
                    >
                    </input>
                    <button className='w-full bg-blue-600 py-2 text-3xl text-white '>Login</button>
                </form>
        
            
            <div className='flex flex-row justify-between text-sm'>
                <Link to={'/reset-password'}> Forgot password?</Link>
                <div className='flex flex-row gap-1 '>
                    <p>New user?</p>
                    <Link to={'/signup'}>Register</Link>
                </div>
            </div>
            
        </div>
    </div>
  )
}
