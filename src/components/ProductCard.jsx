import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { IoIosHeartEmpty,IoIosHeart } from 'react-icons/io';
import {addToWishlist, removeFromWishlist} from '../slices/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';




export const ProductCard = ({product}) => {
    const dispatch= useDispatch();
    const{wishlistItems} = useSelector((state)=> state.wishlist);
    const {user}= useSelector((state)=> state.user);
    const navigate= useNavigate();

    const inWishlist = wishlistItems.some( (p)=> p._id === product._id);

    const wishlistHandler= (e)=>{
        e.preventDefault();
        if ( !user){
            navigate('/login');
            return;
        }
        if( inWishlist){
            dispatch(removeFromWishlist(product._id));
        }
        else{
            dispatch(addToWishlist(product));
        }
        
    }
  return (
    <div className='z-5'>
        <Link to={`/product/${product._id}`}>
            <div className='w-full sm:w-[220px] border border-gray-200 flex flex-col gap-2 hover:shadow-lg sm:hover:scale-105 sm:transition-transform sm:duration-200'>
                <div className='relative h-[260px] sm:h-[294px] '>
                    <img src={product?.thumbnail} alt='' className='w-full h-full z-5 '></img>
                    {
                        inWishlist? (
                            <IoIosHeart onClick={(e)=>wishlistHandler(e)} className='absolute top-0 right-0 h-7 w-7 text-red-600 ' />
                        ):
                        (
                            <IoIosHeartEmpty onClick={(e)=> wishlistHandler(e)} className='absolute top-0 right-0 h-7 w-7'/>
                        )
                    }
                   
                </div>
                <div className='px-3 py-1 '>
                    {/* <p className='font-semibold'>{product?.name.slice(0,10)}</p> */}
                    <p className='font-semibold'>{product?.name.length > 10 ? `${product.name.slice(0, 8)}..` : product.name}
                    </p>
                    <p>₹{product?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}
