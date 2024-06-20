import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const BagPage = () => {
    const dispatch= useDispatch(); 
    const {bag,total,totalItems,removeFromBag}= useSelector((state)=> state.bag);


    function handlePlaceOrder(){
        const products= bag.map( (product)=> product._id);
        console.log("buying all these products ",products);
        // todo: yha se hm payment gateway par jaege to api integrate krni hai jo vhan le jae
    }
  return (
    <div>
        <h1>Your Bag</h1>
        {
            total>0? (
        
            <div className='flex lg: flex-row justify-between'>
                {/* items display */}
                <div>
                    {
                        bag.map( (product,index)=>(
                            <div className='flex flex-row'>
                                <div>
                                    <img src={product.thumbnail} alt=''></img>
                                </div>
                                <div>
                                    <p>{product?.description}</p>
                                    <p>{product?.price}</p>
                                    <button onClick={()=> dispatch(removeFromBag(product._id))}>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* summary */}
                <div>
                    <p>Total Items: {totalItems}</p>
                    <p>Total:</p>
                    <p>Rs. {total}</p>
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
