import React from 'react'

export const About = () => {
  return (
    <div className='h-[100vh] relative'>
        <div className='bg-gradient-to-t from-blue-200 to-cyan-200 h-[50%] w-full'>
        </div>
        <div className='w-[50%] h-[50%] absolute top-[25%] left-[25%] bg-orange-100 border border-black-2 py-3 px-6'>
            <h1 className='text-3xl text-center'>About Us</h1>
            <p className='mt-5 mb-3'>Founded in 2000, Kala Mandir Silk Centre has been dedicated to providing our customers with the finest quality clothing. Over the past two decades, we have established ourselves as a trusted name in the industry, known for our exceptional craftsmanship and luxurious fabrics.</p>
            <p>Our mission is to celebrate the rich heritage of silk and traditional craftsmanship while offering contemporary designs that cater to modern tastes. We strive to bring you an unparalleled selection of silk sarees, garments, and accessories that reflect elegance and sophistication.</p>
        </div>
    </div>
  )
}
