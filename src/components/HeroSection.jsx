import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import {  useNavigate } from 'react-router-dom';

import homeimg from '../assets/suit-removebg-preview.png'
import sale from '../assets/summer.jpg'
import suit from '../assets/suitbg.jpg'
import backgroundImage from '../assets/background.jpg'

export const HeroSection = () => {
    const navigate= useNavigate();
  return (
    <div className='h-80vh '>
      <Swiper
        modules={[ Pagination, A11y,Autoplay]}
        spaceBetween={5}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        loop={true}
        className='h-full'
        style={{
            "--swiper-pagination-color": "black",
            "--swiper-pagination-bullet-inactive-color": "gray",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
      >
        <SwiperSlide>
        <div className='bg-gradient-to-t from-blue-200 to-cyan-200 h-full flex items-center justify-center py-4'>
            <div className='w-11/12 lg:w-10/12 mx-auto max-w-7xl flex flex-col  gap-1 lg:flex-row items-center lg:justify-between  lg:space-y-0'>
                <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                    <h1 className='text-3xl lg:text-5xl font-bold mb-4 animate-fade-in'>
                    Stay In Style With The <br className='hidden lg:block' /> Latest Trends & Fashion
                    </h1>
                    <h2 className='text-lg md:text-xl mb-6 text-gray-700 animate-fade-in'>
                    Express your inner style with our vast collection of clothing
                    </h2>
                    <button onClick={()=> navigate('/category/Women-Indianwear-Stitched')} className='bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300 animate-bounce'>
                    Shop Now
                    </button>
                </div>
                <div className='relative w-full lg:w-1/2'>
                    <div className='w-full h-64 md:h-96 justify-center lg:h-full flex lg:items-center lg:justify-center p-8 animate-fade-in'>
                    <img src={homeimg} alt='Fashion' className='max-w-full h-auto'></img>
                    </div>
                </div>
            </div>
        </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='flex items-center justify-center h-full bg-gradient-to-t from-yellow-300 via-white to-yellow-300'>
            <img src={sale} alt='' className='w-full h-auto'></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='flex items-center justify-center h-full ' 
            style={{ backgroundImage: `url(${backgroundImage})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat' }}
            >
            {/* <img src={suit} alt='' className='max-w-full h-auto absolute top-24 right-16  sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl'></img> */}
            <img src={suit} alt='' className='max-w-full h-auto absolute bottom-0 right-12  sm:top-20 sm:right-12 md:top-16 md:right-8 lg:top-12 lg:right-4 xl:top-24 xl:right-16'></img>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};
