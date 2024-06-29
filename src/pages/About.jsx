import React from 'react'
import backgroundImage from '../assets/bg.jpg'; // Adjust the path as per your folder structure

export const About = () => {

  // return (
  //   <div className='h-[100vh] relative'>
  //       <div className='bg-gradient-to-t from-blue-200 to-cyan-200 h-[50%] w-full'>
  //       </div>
  //       <div className='w-[50%] h-[50%] absolute top-[25%] left-[25%] bg-orange-100 border border-black-2 py-3 px-6'>
  //           <h1 className='text-3xl md:text-4xl font-bold text-center mb-6'>About Us</h1>
  //           <p className='text-lg leading-relaxed mb-4'>Founded in 2000, Kala Mandir Silk Centre has been dedicated to providing our customers with the finest quality clothing. Over the past two decades, we have established ourselves as a trusted name in the industry, known for our exceptional craftsmanship and luxurious fabrics.</p>
  //           <p className='text-lg leading-relaxed'>Our mission is to celebrate the rich heritage of silk and traditional craftsmanship while offering contemporary designs that cater to modern tastes. We strive to bring you an unparalleled selection of silk sarees, garments, and accessories that reflect elegance and sophistication.</p>
  //       </div>
  //   </div>
  // )

  // return (
  //   <div className='min-h-screen relative' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  //     <div className='absolute w-full md:w-3/4 lg:w-1/2 bg-orange-100 rounded-lg shadow-lg p-8 md:p-12 left-64'>
  //       <h1 className='text-3xl md:text-4xl font-bold text-center mb-6'>About Us</h1>
  //       <p className='text-lg leading-relaxed mb-4'>
  //         Founded in 2000, Kala Mandir Silk Centre has been dedicated to providing our customers with the finest quality clothing. Over the past two decades, we have established ourselves as a trusted name in the industry, known for our exceptional craftsmanship and luxurious fabrics.
  //       </p>
  //       <p className='text-lg leading-relaxed'>
  //         Our mission is to celebrate the rich heritage of silk and traditional craftsmanship while offering contemporary designs that cater to modern tastes. We strive to bring you an unparalleled selection of silk sarees, garments, and accessories that reflect elegance and sophistication.
  //       </p>
  //     </div>
  //   </div>
  // )
  return (
    <div className='min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='w-full md:w-3/4 lg:w-1/2 rounded-lg shadow-lg p-8 md:p-12 relative'>
        {/* Use absolute positioning for the content */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h1 className='text-3xl md:text-4xl font-bold text-center mb-6'>About Us</h1>
          <p className='text-lg leading-relaxed mb-4  font-semibold'>
            Founded in 2000, Kala Mandir Silk Centre has been dedicated to providing our customers with the finest quality clothing. Over the past two decades, we have established ourselves as a trusted name in the industry, known for our exceptional craftsmanship and luxurious fabrics.
          </p>
          <p className='text-lg leading-relaxed  font-semibold'>
            Our mission is to celebrate the rich heritage of silk and traditional craftsmanship while offering contemporary designs that cater to modern tastes. We strive to bring you an unparalleled selection of silk sarees, garments, and accessories that reflect elegance and sophistication.
          </p>
        </div>
      </div>
    </div>
  );
  
  
}
