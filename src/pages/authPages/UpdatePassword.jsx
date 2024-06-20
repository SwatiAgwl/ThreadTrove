import React, {  useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/operations/authapi';
import { useLocation } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const UpdatePassword = () => {
    const [password,setPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");
    const dispatch= useDispatch();
    const location= useLocation();

    function submitHandler(e){
        e.preventDefault();
        const token= location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token));
    }
  return (
    <div className=''>
        <div className='h-screen flex flex-col gap-3 justify-center items-center'>
            <h1>Choose new password</h1>
            <form className='flex flex-col gap-2' onSubmit={submitHandler}>
                <input 
                    required
                    type='password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    name='password'
                    placeholder='Password'></input>
                <input
                    required
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    ></input>       

                    <button className='border border-black'>Submit</button>
            </form>
            <Link to={'/login'} > <FaLongArrowAltLeft />Back to login</Link>
        </div>
    </div>
  )
}
