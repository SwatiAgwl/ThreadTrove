import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { fetchProductDetails } from '../services/operations/productapi';
import { SlHandbag } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import {  addToBag } from '../slices/bagSlice';


export const ProductPage = () => {
    const {product_id}= useParams();
    const [productDetails,setProductDetails]= useState("");
    const [bagStatus, setBagStatus]= useState(false);
    const {bagItems}= useSelector( (state)=> state.bag);
    const dispatch= useDispatch();

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
        dispatch(addToBag(data));
        setBagStatus(true); // refresh se value false ho rhi hai
    }

  return (
    <div>
        <div className='flex lg:flex-row max-w-maxContent w-11/12'>
            {/* left part */}
            <div className='w-full'>
                <img src={productDetails?.thumbnail} alt=''></img>
            </div>
            {/* right part */}
            <div className='w-full'>
                <p>{productDetails?.name}</p>
                <p>{productDetails?.description}</p>
                <p>{productDetails?.price}</p>
                <div className='flex lg: flex-row w-full gap-2'>
                    <button onClick={()=>bagHandler(productDetails)} className='flex flex-row gap-2 items-center bg-red-500 text-white px-4 py-2 rounded w-[40%]'> 
                        <SlHandbag />Add To Bag
                    </button>               
                    <button className='flex flex-row gap-2 items-cente border border-gray-600 px-4 py-2 rounded w-[40%]'>Buy Now</button>
                </div>
            </div>
        </div>
    </div>
  )
}
