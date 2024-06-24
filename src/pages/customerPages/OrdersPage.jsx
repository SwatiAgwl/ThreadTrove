import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../services/operations/profileapi';
import { setOrderItems } from '../../slices/orderSlice';

export const OrdersPage = () => {
  const {token}= useSelector((state)=> state.auth);
  // const [orderItems, setOrderItems]= useState(null);
  const {orderItems}= useSelector((state)=> state.order);
  const dispatch= useDispatch();

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
  return (
    <div>
      <div>
        <h1>All Orders</h1>
        <div className='bg-gray-400 py-2 px-2'>
          {
            orderItems!==null && orderItems.length? (
              // har ek order item ka card bna lo : ORDERITEM mei hmare pass product model ka data aa rha hai
              
                orderItems.map( (item,index)=>(
                  item ? (
                    <div key={index} className='px-2 py-2 flex flex-row'>
                      <div>
                        {item.thumbnail && <img src={item.thumbnail} alt='' className=' h-24'></img>}
                      </div>
                      <div>
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  ) : null
                //   <div className='px-2 py-2' key={index}>
                //     <div className='flex flex-col'>
                //       <p>{orderItem.status}</p>
                //       {/* date on which ordered */}
                //       <p>{orderItem.date}</p>  
                //     </div>
                   
                //     <div className='flex flex-row'>
                //       <img src={`${orderItem.product.thumbnail}`} alt=''></img>
                //       <div className='flex flex-col'>
                //         {/* <p>{orderItem.product.name}</p> */}
                //         <p>{orderItem.product.description}</p>
                //         <p>{orderItem.product.price}</p>
                //       </div>  
                //     </div>
                //   </div>
                // ))
              
            ))): 
            (<p>No orders to show</p>)
          }
        </div>
      </div>
    </div>
  )
}
