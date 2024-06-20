import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { getOrders } from '../../services/operations/profileapi';

export const OrdersPage = () => {
  const {token}= useSelector((state)=> state.auth);
  const [orderItems, setOrderItems]= useState(null);

  const getOrderItems = async()=>{
    try{
      const response= await getOrders(token);
      setOrderItems(response);
    }
    catch(error){
      console.log("unable to fetch orders currently in frontend")
    }
  }

  useEffect(()=>{
    getOrderItems();
  },[])

  console.log("orderItems ",orderItems);
  return (
    <div>
      <div>
        <h1>All Orders</h1>
        <div className='bg-gray-400 py-2 px-2'>
          {
            orderItems!==null && orderItems.length? (
              // har ek order item ka card bna lo : ORDERITEM mei hmare pass product model ka data aa rha hai
              
                orderItems.map( (orderItem,index)=>(
                  <div className='px-2 py-2' key={index}>
                    <div className='flex flex-col'>
                      <p>{orderItem.status}</p>
                      {/* date on which ordered */}
                      <p>{orderItem.date}</p>  
                    </div>
                   
                    <div className='flex flex-row'>
                      <img src={`${orderItem.product.thumbnail}`} alt=''></img>
                      <div className='flex flex-col'>
                        {/* <p>{orderItem.product.name}</p> */}
                        <p>{orderItem.product.description}</p>
                        <p>{orderItem.product.price}</p>
                      </div>  
                    </div>
                  </div>
                ))
              
            ): (<p>No orders to show</p>)
          }
        </div>
      </div>
    </div>
  )
}
