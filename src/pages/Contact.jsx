import React from 'react'
import { useForm } from 'react-hook-form'
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdMail } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";

import { useEffect } from 'react';
import { ContactCard } from '../components/ContactCard';

export const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    }= useForm();

    useEffect(()=>{
        if( isSubmitSuccessful){
            reset({
                name:"",
                email:"",
                phoneNumber:"",
                message: "",
            })
        }
    },[reset, isSubmitSuccessful]);

    const submitContactForm= async(data)=>{
        console.log("form data ",data);
        try{
            // const response= await 
            const response= "Ok";
            console.log("form response ",response);
        }
        catch(err){
            console.log(err.message);
        }
    }

  return (
    <div className='py-6 w-10/12 mx-auto'>
        <h1 className='text-4xl bold text-center'>Get In Touch</h1>
        <p className='text-xl '>We'd love to hear from you, Please fill out this form</p>

        <div className='flex lg:flex-row  py-3 px-6 justify-between'>
            {/* form */}
            
            <form className='flex flex-col gap-3 w-[50%]' onSubmit={handleSubmit(submitContactForm)}>
                {/* name */}
                <div className='flex flex-col'>
                    <label htmlFor="name">Name</label>
                    <input className='border border-black'
                        type='text'
                        name='name'
                        id='name'
                        {...register("name", {required:true})}
                    />
                    {
                        errors.name && (
                            <span>Please enter your name</span>
                        )
                    }
                </div>
                {/* email */}
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input className='border border-black'
                        type='email'
                        name='email'
                        id='email'
                        {...register("email",{required: true})}
                    />
                    {
                        errors.email && (
                            <span>Please enter your email</span>
                        )
                    }
                </div>
                {/* phnnum */}
                <div className='flex flex-col'>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input className='border border-black'
                        type="number"
                        name='phoneNumber'
                        id='phoneNumber'
                        placeholder='12345 67890' 
                        {...register("phoneNumber", {
                            required:  { value:true, message: "Please enter phone number"},
                            maxLength: { value:10, message: "Invalid phone number"},
                            minLength: { value:10, message: "Invalid phone number"}
                        })}
                        
                        />
                        {
                            errors.phoneNumber && (
                                <span>{errors.phoneNumber.message}</span>
                            )
                        }
                </div>
                {/* message */}
                <div className='flex flex-col'>
                    <label htmlFor="message">Message</label>
                    <textarea className='border border-black'
                        name="message" 
                        id="message" 
                        cols="30"
                        rows="7"
                        placeholder='Enter your message here'
                        {...register("message", {required: true})}
                        ></textarea>
                    {
                        errors.message && (
                            <span>Please enter your message</span>
                        )
                    }
                </div>

                <button  className='border border-black' type='submit'>Send Message</button>
               
            </form>
            {/* cards */}
            <div className='flex flex-col gap-4 w-[40%] bg-gradient-to-t from-blue-200 to-cyan-200'>
            <ContactCard icon={<FaLocationDot />} heading={"Address"} content={"Meeran Malli Market, Derabassi,Punjab"}/>
            <ContactCard icon={<BiSolidPhoneCall />} heading={"Call Us:"} content={"9888362135, 96462482220"}/>
            <ContactCard icon={<MdMail />} heading={"Email"} content={"kalamandir@gmail.com"}/>
            <ContactCard heading={"Follow us on:"} content={<div className='flex flex-row'><IoLogoInstagram /> <FaFacebookSquare /> </div>}/>
            
            </div>

        </div>

        {/* map */}
        <div>Map</div>
    </div>
  )
}
