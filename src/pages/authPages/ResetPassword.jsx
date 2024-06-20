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
    <div className='flex w-full h-screen justify-center items-center'>
        <div className='flex flex-col items-center justify-center gap-3'>
            <h1>
                {
                    !emailSent? ("Reset Your Password"): ("Check Your Email")
                }
            </h1>
            <p>
                {
                    !emailSent? ("Have no fear. We'll email you instructions to reset your password"): (`We have sent the reset email to ${email}`)
                }
            </p>
            <form onSubmit={submitHandler}>
                {
                    !emailSent && (
                        <input
                        required
                        type='email'
                        name='email'
                        value={email}
                        placeholder='E-mail'
                        onChange={(e)=> setEmail(e.target.value)}
                        >

                        </input>
                    )
                }
                {
                    <button className='border border-black-3' type='submit'>
                        {
                            !emailSent? "Reset Password": "Resend Email"
                        }
                    </button>
                }
            </form>

            <Link to={'/login'} > <FaLongArrowAltLeft />Back to login</Link>
        </div>
    </div>
  )
}
