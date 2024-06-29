import React from 'react'
import { useForm } from 'react-hook-form'
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdMail } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

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

//   return (
//     <div className='py-6 w-10/12 mx-auto'>
//         <h1 className='text-4xl bold text-center'>Get In Touch</h1>
//         <p className='text-xl '>We'd love to hear from you, Please fill out this form</p>

//         <div className='flex lg:flex-row  py-3 px-6 justify-between'>
//             {/* form */}
            
//             <form className='flex flex-col gap-3 w-[50%]' onSubmit={handleSubmit(submitContactForm)}>
//                 {/* name */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="name">Name</label>
//                     <input className='border border-black'
//                         type='text'
//                         name='name'
//                         id='name'
//                         {...register("name", {required:true})}
//                     />
//                     {
//                         errors.name && (
//                             <span>Please enter your name</span>
//                         )
//                     }
//                 </div>
//                 {/* email */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="email">Email</label>
//                     <input className='border border-black'
//                         type='email'
//                         name='email'
//                         id='email'
//                         {...register("email",{required: true})}
//                     />
//                     {
//                         errors.email && (
//                             <span>Please enter your email</span>
//                         )
//                     }
//                 </div>
//                 {/* phnnum */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="phoneNumber">Phone Number</label>
//                     <input className='border border-black'
//                         type="number"
//                         name='phoneNumber'
//                         id='phoneNumber'
//                         placeholder='12345 67890' 
//                         {...register("phoneNumber", {
//                             required:  { value:true, message: "Please enter phone number"},
//                             maxLength: { value:10, message: "Invalid phone number"},
//                             minLength: { value:10, message: "Invalid phone number"}
//                         })}
                        
//                         />
//                         {
//                             errors.phoneNumber && (
//                                 <span>{errors.phoneNumber.message}</span>
//                             )
//                         }
//                 </div>
//                 {/* message */}
//                 <div className='flex flex-col'>
//                     <label htmlFor="message">Message</label>
//                     <textarea className='border border-black'
//                         name="message" 
//                         id="message" 
//                         cols="30"
//                         rows="7"
//                         placeholder='Enter your message here'
//                         {...register("message", {required: true})}
//                         ></textarea>
//                     {
//                         errors.message && (
//                             <span>Please enter your message</span>
//                         )
//                     }
//                 </div>

//                 <button  className='border border-black' type='submit'>Send Message</button>
               
//             </form>
//             {/* cards */}
//             <div className='flex flex-col gap-4 w-[40%] bg-gradient-to-t from-blue-200 to-cyan-200'>
//             <ContactCard icon={<FaLocationDot />} heading={"Address"} content={"Meeran Malli Market, Derabassi,Punjab"}/>
//             <ContactCard icon={<BiSolidPhoneCall />} heading={"Call Us:"} content={"9888362135, 96462482220"}/>
//             <ContactCard icon={<MdMail />} heading={"Email"} content={"kalamandir@gmail.com"}/>
//             <ContactCard heading={"Follow us on:"} content={<div className='flex flex-row'><IoLogoInstagram /> <FaFacebookSquare /> </div>}/>
            
//             </div>

//         </div>

//         {/* map */}
//         <div>Map</div>
//     </div>
//   )
// }


return (
    <div className='mt-6 w-10/12 mx-auto space-y-3'>
      <h1 className='text-4xl font-bold text-center'>Get In Touch</h1>
      <p className='text-xl text-center'>We'd love to hear from you. Please fill out this form.</p>

      <div className='flex flex-col lg:flex-row py-6 px-6 justify-between'>
        {/* Form */}
        <div className='w-full lg:w-1/2 px-8'>
        <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmit(submitContactForm)}>
          {/* Name */}
          <div className='flex flex-col'>
            <label htmlFor="name">Name</label>
            <input
              className='border border-black px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 transition duration-200'
              type='text'
              name='name'
              id='name'
              {...register("name", { required: true })}
            />
            {errors.name && <span className='text-red-500'>Please enter your name</span>}
          </div>
          {/* Email */}
          <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input
              className='border border-black px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 transition duration-200'
              type='email'
              name='email'
              id='email'
              {...register("email", { required: true })}
            />
            {errors.email && <span className='text-red-500'>Please enter your email</span>}
          </div>
          {/* Phone Number */}
          <div className='flex flex-col'>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              className='border border-black px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 transition duration-200'
              type="number"
              name='phoneNumber'
              id='phoneNumber'
              placeholder='12345 67890'
              {...register("phoneNumber", {
                required: { value: true, message: "Please enter phone number" },
                maxLength: { value: 10, message: "Invalid phone number" },
                minLength: { value: 10, message: "Invalid phone number" }
              })}
            />
            {errors.phoneNumber && <span className='text-red-500'>{errors.phoneNumber.message}</span>}
          </div>
          {/* Message */}
          <div className='flex flex-col'>
            <label htmlFor="message">Message</label>
            <textarea
              className='border border-black px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 transition duration-200'
              name="message"
              id="message"
              cols="30"
              rows="7"
              placeholder='Enter your message here'
              {...register("message", { required: true })}
            ></textarea>
            {errors.message && <span className='text-red-500'>Please enter your message</span>}
          </div>

          <button className='border border-black bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200'>
            Send Message
          </button>
        </form>
        </div>

        {/* Contact Cards */}
        <div className='flex flex-col gap-4 w-full lg:w-1/2 px-6 py-4 rounded-lg'>
          <ContactCard icon={<FaLocationDot />} heading={"Address"} content={"Meeran Malli Market, Derabassi, Punjab"} />
          <ContactCard icon={<BiSolidPhoneCall />} heading={"Call Us:"} content={"9888362135, 96462482220"} />
          <ContactCard icon={<MdMail />} heading={"Email"} content={"kalamandir@gmail.com"} />
          {/* <ContactCard heading={"Follow us on:"} content={<div className='flex flex-row'><IoLogoInstagram className='mr-2' /><FaFacebookSquare /></div>} /> */}
          {/* <div> */}
          <h3 className='text-2xl font-semibold text-center'>Follow us on: </h3>
          <div className='flex flex-row gap-4 mx-auto'>
          <Link to="https://www.instagram.com/kalamandirsilkcentre_derabassi?igsh=MWR5eDFxZjhsbTJ0eg==">
            <IoLogoInstagram className='w-9 h-9'/> </Link>
          <Link to="https://www.facebook.com/kalamandirsilkcentre?mibextid=ZbWKwL">
          <FaFacebookSquare className='w-9 h-9'/>
          </Link>
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* Map */}
      
      <div className='mt-6 w-full max-w-maxContent mx-auto bg-gray-100 mb-8'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3434.6618047379015!2d76.84048877557471!3d30.587091174654827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f95420022d1a9%3A0x9bf95bdec4f5296c!2sKala%20Mandir%20Silk%20Centre!5e0!3m2!1sen!2sin!4v1719523498988!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title='Map'
            >

          </iframe>
        </div>


    </div>
  );
};

