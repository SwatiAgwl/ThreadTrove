import React from 'react'
import { useSelector } from 'react-redux'

export const WishlistPage = () => {
    const{wishlist,totItems}= useSelector((state)=> state.wishlist);
    function handleMoveToBag(){

    }

  return (
    <div>
        {
            totItems===0? (<p>Your wishlist is empty</p>): 
            (
                <div>
                    <p>My Wishlist: {totItems} items</p>
                    {
                        wishlist.map( (product,index)=>(
                            <div>
                                <img src={product.thumbnail} alt=''></img>
                                 {/* cross icon */}
                                <p>{product.description}</p>
                                <p>{product.price}</p>
                                <button onClick={handleMoveToBag} className='border border-black'>Move to Bag</button>
                            </div>
                        )
                        )
                    }
                </div>
            )
        
        
        }
    </div>
  )
}
