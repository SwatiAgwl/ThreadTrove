import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross2 } from "react-icons/rx";
import { removeFromWishlist } from '../../slices/wishlistSlice';
import { addToBag } from '../../slices/bagSlice';

export const WishlistPage = () => {
    const{wishlistItems,totItems}= useSelector((state)=> state.wishlist);
    const dispatch= useDispatch();

    const btnHandler= (product)=>{
        dispatch(addToBag(product));
        dispatch(removeFromWishlist(product._id));
    }

  return (
    <div>
        {
            totItems===0? (<p className='w-10/12 h-screen max-w-maxContent mx-auto flex justify-center mt-10 font-semibold text-2xl '>Your wishlist is empty</p>): 
            (
                <div className='w-10/12 mt-8 mx-auto max-w-maxContent space-y-8' >
                    <p className='text-xl font-semibold'>My Wishlist: {totItems} items</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {
                        wishlistItems.map( (product,index)=>(
                            <div key={index} className=' w-[220px] border border-gray-200 flex flex-col gap-2'>
                                <div className='relative h-[294px]'>
                                    <img src={product.thumbnail} alt='' className='w-full h-full'></img>
                                    <RxCross2 onClick={()=> dispatch(removeFromWishlist(product._id))} className='absolute top-0 right-0 h-7 w-7'/>
                                    
                                </div>
        
                                 <div className='px-2 '>
                                    <p className='font-semibold'>{product.name}</p>
                                    <p className='text-gray-500'>₹{product.price}</p>     
                                </div>
                                <button onClick={()=>btnHandler(product)} className='border border-gray-300 text-white bg-red-500 w-full'>Move to Bag</button>
                            </div>
                        )
                        )
                    }
                    </div>
                </div>
            )
        
        
        }
    </div>
  )
}
