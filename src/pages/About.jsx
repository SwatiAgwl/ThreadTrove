
import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/bg.jpg'; // Adjust the path as per your folder structure

export const About = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className="h-fit min-h-screen flex items-center justify-center p-2"
      style={{
        backgroundImage: isLargeScreen ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: isLargeScreen ? 'transparent' : 'lightgray',
      }}
    >
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-1/2 bg-white bg-opacity-80 rounded-lg p-2 sm:p-8 md:p-12 relative">
        <div className="relative p-2 sm:p-6 md:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">About Us</h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-4 font-semibold">
            Founded in 2000, Kala Mandir Silk Centre has been dedicated to providing our customers with the finest quality clothing. Over the past two decades, we have established ourselves as a trusted name in the industry, known for our exceptional craftsmanship and luxurious fabrics.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed font-semibold">
            Our mission is to celebrate the rich heritage of silk and traditional craftsmanship while offering contemporary designs that cater to modern tastes. We strive to bring you an unparalleled selection of Designer suits, Fancy dresses, Kurta-Payjamas, Pent-Shirt, Turbans and Rumala Sahib that reflect elegance and sophistication.
          </p>
        </div>
      </div>
    </div>
  );
}

