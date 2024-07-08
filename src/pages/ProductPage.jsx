import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import { fetchProductDetails } from '../services/operations/productapi';
import { SlHandbag } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import {  addToBag } from '../slices/bagSlice';
import {buyProduct} from "../services/operations/paymentapi"
import { ErrorPage } from './ErrorPage';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { setOrderItems } from '../slices/orderSlice';
import { getOrders } from '../services/operations/profileapi';




export const ProductPage = () => {
    const {product_id}= useParams();
    const [productDetails,setProductDetails]= useState("");
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const {token}= useSelector((state)=> state.auth)
    const {user}= useSelector ((state)=> state.user)
    const [confirmationModal,setConfirmationModal]= useState(null);
    
    // fetch product details
    const fetchProduct= async()=>{
        const res= await fetchProductDetails(product_id);
        setProductDetails(res);
    }
    useEffect(()=>{
        if( product_id){
            fetchProduct();
        }
    },[product_id]);

    const bagHandler= (data)=>{
        if(token){
            dispatch(addToBag(data));
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to add to bag",
            btn1text: "Login",
            btn2text: "Cancel",
            btn1handler: ()=> navigate("/login"),
            btn2handler: ()=> setConfirmationModal(null)
        })
    }


    
    const buyProductHandler= async()=>{
        if( token){
            await buyProduct(token,[product_id],user,navigate,dispatch);
            // getOrderItems(); need orderItems slice as need to reset orderItems after payment
            // const response= await getOrders(token);
            // console.log("after payment succ might be error of response ",response);
            // if( response){
            //     dispatch(setOrderItems(response));
            // }

            return;
        }
        setConfirmationModal ({
            text1: "You are not logged in",
            text2: "Please Login to purchase product",
            btn1text: "Login",
            btn2text: "Cancel",
            btn1handler: ()=> navigate('/login'),
            btn2handler: ()=> setConfirmationModal(null),
        })
    }

    //if( !productDetails.success){
    if( productDetails === ""){
        console.log("success ", productDetails.success);
        return (
            <div>
                <ErrorPage/>
            </div>
        )
    }

  return (
    <div className='w-full p-10 bg-gray-100'>
        <div className='max-w-maxContent w-11/12 sm:w-10/12 mx-auto flex flex-col lg:flex-row gap-8 '>
            {/* left part */}
            <div className='w-full'>
                <img src={productDetails?.thumbnail} alt='' className='w-full h-auto rounded-lg shadow-md'></img>
            </div>
            {/* right part */}
            <div className='w-full h-fit sm:h-72 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg '>
                <p className='text-2xl font-bold'>{productDetails?.name}</p>
                <p className='text-gray-700'>{productDetails?.description}</p>
                <p className='text-xl font-semibold text-red-500'>₹{productDetails?.price}</p>
                <div className='flex flex-col sm:flex-row w-full gap-2 mt-4'>
                    <button onClick={()=>bagHandler(productDetails)} className='flex flex-row gap-2 items-center bg-red-500 text-white px-4 py-2 rounded w-full sm:w-[40%]'> 
                        <SlHandbag />Add To Bag
                    </button>               
                    <button onClick={buyProductHandler} className='flex flex-row gap-2 items-cente border border-gray-600 px-4 py-2 rounded w-full sm:w-[40%]'>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
        { 
            confirmationModal && (
                <ConfirmationModal modalData={confirmationModal}/>
            )
        }
    </div>
  )
}
