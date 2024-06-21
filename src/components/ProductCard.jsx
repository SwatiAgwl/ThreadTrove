import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosHeartEmpty,IoIosHeart } from 'react-icons/io';
import {addToWishlist, removeFromWishlist} from '../slices/wishlistSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';


export const ProductCard = ({product}) => {
    const dispatch= useDispatch();
    const{wishlistItems} = useSelector((state)=> state.wishlist);

    const inWishlist = wishlistItems.some( (p)=> p._id === product._id);

    const wishlistHandler= (e)=>{
        e.preventDefault();
        if( inWishlist){
            dispatch(removeFromWishlist(product._id));
        }
        else{
            dispatch(addToWishlist(product));
        }
        
    }
  return (
    <div>
        <Link to={`/product/${product._id}`}>
            <div>
                <div className='relative'>
                    <img src={product?.thumbnail} alt='' className='w-full h-25 '></img>
                    {
                        inWishlist? (
                            <IoIosHeart onClick={(e)=> wishlistHandler(e)} className='absolute top-0 right-0 h-7 w-7 text-red-600' />
                        ):
                        (
                            <IoIosHeartEmpty onClick={(e)=> wishlistHandler(e)} className='absolute top-0 right-0 h-7 w-7'/>
                        )
                    }
                   
                </div>
                <div>
                    <p>{product?.name}</p>
                    <p>{product?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}
