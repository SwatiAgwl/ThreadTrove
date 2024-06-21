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
            totItems===0? (<p>Your wishlist is empty</p>): 
            (
                <div className='w-10/12 mx-auto max-w-maxContent'>
                    <p>My Wishlist: {totItems} items</p>
                    <div className='grid lg:grid-cols-4'>
                    {
                        wishlistItems.map( (product,index)=>(
                            <div className=' w-[210px]'>
                                <div className='relative h-[280px]'>
                                    <img src={product.thumbnail} alt='' className='w-full'></img>
                                    <RxCross2 onClick={()=> dispatch(removeFromWishlist(product._id))} className='absolute top-0 right-0 h-7 w-7'/>
                                    
                                </div>
                                 {/* cross icon */}
                                 <div>
                                    <p>{product.description}</p>
                                    <p>{product.price}</p>
                                    <button onClick={()=>btnHandler(product)} className='border border-black'>Move to Bag</button>
                                </div>
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
