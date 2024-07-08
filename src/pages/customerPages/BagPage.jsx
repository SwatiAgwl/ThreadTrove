import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBag } from '../../slices/bagSlice';
import { buyProduct } from '../../services/operations/paymentapi';
import { useNavigate } from 'react-router-dom';

export const BagPage = () => {
    const dispatch= useDispatch(); 
    const {bagItems,bagTotal,totalItems}= useSelector((state)=> state.bag);
    const {token}= useSelector((state)=>state.auth);
    const {user}= useSelector((state)=>state.user);
    const navigate= useNavigate();


    function handlePlaceOrder(){
        const products= bagItems.map( (product)=> product._id);
        console.log("buying all these products ",products);
        // todo: yha se hm payment gateway par jaege to api integrate krni hai jo vhan le jae
        buyProduct(token,products,user,navigate,dispatch);
    }
//   return (
//     <div className='w-8/12 max-w-maxContent mx-auto py-6'>
//         <h1 className='text-xl font-semibold mb-6'>Your Bag</h1>
//         {
//             totalItems>0? (
        
//             <div className='flex lg: flex-row justify-between'>
//                 {/* items display */}
//                 <div className='w-[50%] border border-gray-400 px-2 py-2 space-y-2'>
//                     {
//                         bagItems.map( (product,index)=>(
//                             <div key={index} className='flex flex-row border border-black'>
//                                 <div>
//                                     <img src={product.thumbnail} alt='' className='w-full h-32'></img>
//                                 </div>
//                                 <div>
//                                     <p>{product?.description}</p>
//                                     <p>{product?.price}</p>
//                                     <button className='border border-black' onClick={()=> dispatch(removeFromBag(product?._id))}>Remove</button>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>
//                 {/* summary */}
//                 <div className='w-[40%] border border-gray-400 px-2 py-2'>
//                     <p>Total Items: {totalItems}</p>
//                     <p>Total Amount: Rs.{bagTotal}</p>
//                     <button onClick={handlePlaceOrder} className='border border-black'>Place Order</button>
//                 </div>
//             </div>
//             ):
//             (
//                 <p>Your bag is empty</p>
//             )

// }
//     </div>
//   )
// }


return (
    <div className='w-10/12 sm:w-8/12 max-w-maxContent mx-auto py-6'>
      <h1 className='text-2xl font-semibold mb-6'>Your Bag</h1>
      {totalItems > 0 ? (
        <div className='flex flex-col lg:flex-row justify-between gap-4'>
          {/* Items display */}
          <div className='w-full lg:w-2/3 border border-gray-300 rounded-lg px-4 py-4 space-y-4'>
            {bagItems.map((product, index) => (
              <div key={index} className='flex flex-row items-center border-b border-gray-200'>
                <div className='w-32 h-32 overflow-hidden'>
                  <img src={product.thumbnail} alt='' className='w-full h-full' />
                </div>
                <div className='ml-4 flex-1'>
                  <p className='text-lg font-semibold'>{product?.description}</p>
                  <p className='text-gray-600'>₹{product?.price}</p>
                  <button className='mt-2 px-4 py-2 border border-gray-300 rounded-md bg-red-400 text-white hover:bg-red-500 transition duration-200'
                          onClick={() => dispatch(removeFromBag(product?._id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div className='w-full lg:w-1/3 bg-gray-100 rounded-lg border px-4 py-4 mt-4 lg:mt-0 h-72'>
            <h2 className='text-2xl font-semibold mb-6'>Summary</h2>
            <div className='flex justify-between mb-2'>
              <p className='text-lg'>Total Items:</p>
              <p className='text-lg font-semibold'>{totalItems}</p>
            </div>
            <div className='flex justify-between mb-2'>
              <p className='text-lg'>Total Amount:</p>
              <p className='text-lg font-semibold'>Rs.{bagTotal}</p>
            </div>  
            <p>+Delievery charges extra</p>
            <button onClick={handlePlaceOrder} className='w-full mt-6 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200'>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <p className='text-xl text-center h-screen'>Your bag is empty</p>
      )}
    </div>
  );
}  