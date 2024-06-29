import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../services/operations/profileapi';
import { setOrderItems } from '../../slices/orderSlice';

export const OrdersPage = () => {
  const {token}= useSelector((state)=> state.auth);
  // const [orderItems, setOrderItems]= useState(null);
  const {orderItems}= useSelector((state)=> state.order);
  const dispatch= useDispatch();
 
  // orderItems.map( (orderItem,index)=>(

  //   console.log(orderItem.status);
  //   console.log(orderItem.date);
  // ))
  // orderItems.forEach(orderItem => {
  //   console.log(orderItem.status);
  //   console.log(orderItem.date);
  //   console.log(orderItem.product);
  // });
  // const getOrderItems = async()=>{
  //   try{
  //     const response= await getOrders(token);
  //     // yha shyd fat jae kyuki response arr hai hme ek ek krke item bhejne padege
  //     if( response){
  //       // response.map( (order,index)=>(
  //       //   order.items.map((item,index)=>(
  //       //     dispatch(setOrderItems(order.items));
  //       //   ))
          
  //       // ))
  //       const allOrderItems = [];
  //       response.forEach(order => {
  //         order.items.forEach(item => {
  //           allOrderItems.push(item.product); // product populate kia hua hai 
  //         });
  //       });
  //       dispatch(setOrderItems(allOrderItems)); 
  //     }
  //   }
  //   catch(error){
  //     console.log("unable to fetch orders currently in frontend")
  //   }
  // }

  // useEffect(()=>{
  //   if( token)
  //     getOrderItems();
  // },[])

  console.log("orderItems ",orderItems);
//   return (
//     <div>
//       <div>
//         <h1>All Orders</h1>
//         <div className='bg-gray-400 py-2 px-2'>
//           {
//             orderItems!==null && orderItems.length? (
//               // har ek order item ka card bna lo : ORDERITEM mei hmare pass product model ka data aa rha hai
              
//                 // orderItems.map( (item,index)=>(
//                 //   item ? (
//                 //     <div key={index} className='px-2 py-2 flex flex-row'>
//                 //       <div>
//                 //         {item.thumbnail && <img src={item.thumbnail} alt='' className=' h-24'></img>}
//                 //       </div>
//                 //       <div>
//                 //         <p>{item.name}</p>
//                 //         <p>{item.price}</p>
//                 //       </div>
//                 //     </div>
//                 //   ) : null

//                 orderItems.map((orderItem,index)=> (
//                   <div className='px-2 py-2' key={index}>
//                     <div className='flex flex-col'>
//                       <p>{orderItem.status}</p>
//                       {/* date on which ordered */}
//                       {/* <p>{orderItem.date}</p>   */}
//                       <p>{new Date(orderItem.date).toLocaleDateString()} {new Date(orderItem.date).toLocaleTimeString()}</p>
//                     </div>
                   
//                     <div className='flex flex-row'>
//                       <img src={`${orderItem.product.thumbnail}`} alt='' className='h-24'></img>
//                       <div className='flex flex-col'>
//                         {/* <p>{orderItem.product.name}</p> */}
//                         <p>{orderItem.product.description}</p>
//                         <p>{orderItem.product.price}</p>
//                       </div>  
//                     </div>
//                   </div>
//                 )))
   
              
//             // )))
//             : 
//             (<p>No orders to show</p>)
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

return (
  <div className='w-10/12 max-w-maxContent mx-auto py-6'>
    <h1 className='text-2xl font-semibold mb-6'>All Orders</h1>
    <div className='bg-gray-100 border border-gray-300 rounded-lg p-4'>
      {orderItems !== null && orderItems.length ? (
        orderItems.map((orderItem, index) => (
          <div key={index} className='mb-4 bg-white border border-gray-200 rounded-lg p-4'>
            <div className='mb-2'>
              <p className='text-lg font-semibold'>{orderItem.status}</p>
              <p className='text-sm text-gray-500'>
                on {new Date(orderItem.date).toLocaleDateString()} {new Date(orderItem.date).toLocaleTimeString()}
              </p>
            </div>
            <div className='flex flex-row items-center'>
              <img src={orderItem.product.thumbnail} alt='' className='h-24 w-24 rounded-lg' />
              <div className='ml-4'>
                <p className='text-md font-semibold'>{orderItem.product.name}</p>
                <p className='text-md  text-gray-500'>{orderItem.product.description}</p>
                <p className='text-md  text-gray-500'>₹{orderItem.product.price}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className='text-center text-lg font-semibold text-gray-500'>No orders to show</p>
      )}
    </div>
  </div>
)
}
