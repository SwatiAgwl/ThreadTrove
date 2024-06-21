import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBag } from '../../slices/bagSlice';

export const BagPage = () => {
    const dispatch= useDispatch(); 
    const {bagItems,bagTotal,totalItems}= useSelector((state)=> state.bag);


    function handlePlaceOrder(){
        const products= bagItems.map( (product)=> product._id);
        console.log("buying all these products ",products);
        // todo: yha se hm payment gateway par jaege to api integrate krni hai jo vhan le jae
    }
  return (
    <div className='w-8/12 max-w-maxContent mx-auto py-6'>
        <h1>Your Bag</h1>
        {
            totalItems>0? (
        
            <div className='flex lg: flex-row justify-between'>
                {/* items display */}
                <div className='w-[50%] border border-gray-400 px-2 py-2 space-y-2'>
                    {
                        bagItems.map( (product,index)=>(
                            <div key={index} className='flex flex-row border border-black'>
                                <div>
                                    <img src={product.thumbnail} alt='' className='w-full h-32'></img>
                                </div>
                                <div>
                                    <p>{product?.description}</p>
                                    <p>{product?.price}</p>
                                    <button className='border border-black' onClick={()=> dispatch(removeFromBag(product?._id))}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* summary */}
                <div className='w-[40%] border border-gray-400 px-2 py-2'>
                    <p>Total Items: {totalItems}</p>
                    <p>Total Amount: Rs.{bagTotal}</p>
                    <button onClick={handlePlaceOrder} className='border border-black'>Place Order</button>
                </div>
            </div>
            ):
            (
                <p>Your bag is empty</p>
            )

}
    </div>
  )
}
