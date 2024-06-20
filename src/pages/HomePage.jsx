import React from 'react'

import suitImage1 from '../assets/suit4.png'
import suitImage2 from '../assets/suit2.jpeg'
import suitImage3 from '../assets/suit3.jpeg'



export const HomePage = () => {
  return (
    <div>
        {/* hero section */}
        {/* <div className='bg-orange-100 h-screen w-full'> */}
        <div className='bg-gradient-to-t from-blue-200 to-cyan-200 h-screen w-full'>

            <div className='w-10/12 h-full mx-auto max-w-maxContent flex lg:flex-row  item-center'>
                <div className='h-full flex flex-col justify-center'>
                    <h1 className='text-4xl'>Stay In Style With The <br /> Latest Trends & Fashion</h1>
                    <h2 className='text-l'>Express your inner style with our vast collection of clothing</h2>
                    <button className='bg-black text-white '>Shop Now</button>
                </div>
                
                <img></img>
            </div>
            
        </div>

        {/* best selling */}
        <div className='w-10/12 mx-auto mt-10'>
            <h2 className='text-2xl mx-auto text-center'>Best Selling</h2>
            <div className='flex lg:flex-row justify-center gap-4'>
                
                <img width="200px" height="200px" src={suitImage1} alt=''></img>
                <img width="200px" height="200px" src={suitImage2} alt=''></img>
                <img width="200px" height="200px" src={suitImage3} alt=''></img>
                
            </div>
            
        </div>


        {/* women's wear */}
        <div className='h-screen bg-orange-100 mt-10'>
            <div className=' w-10/12 max-w-maxContent mx-auto  h-full  flex lg:flex-row '>
                <div className='w-1/2 h-full flex  items-center'>
                    <p className='text-4xl'>Women's Wear</p>
                </div>
                <div className='w-1/2 grid grid-cols-2 gap-6 my-auto'>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                </div>
            </div>
        </div>

        {/* men's wear */}
        <div className='h-screen bg-orange-100 mt-10'>
            <div className=' w-10/12 max-w-maxContent mx-auto  h-full  flex lg:flex-row '>
                <div className='w-1/2 h-full flex  items-center'>
                    <p className='text-4xl'>Men's Wear</p>
                </div>
                <div className='w-1/2 grid grid-cols-2 gap-6 my-auto'>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                    <img width="200px" height="200px" src={suitImage1} alt=''></img>
                </div>
            </div>
        </div>


    </div>
  )
}
