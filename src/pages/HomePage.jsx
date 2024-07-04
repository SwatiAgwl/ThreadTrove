import React from 'react';

// import suitImage1 from '../assets/suit4.png';
import suitImage2 from '../assets/suit2.jpeg'
import suitImage3 from '../assets/suit3.jpeg';
import suitImage5 from '../assets/suit5.jpg';
import suitImage7 from '../assets/suit7.jpeg';
import top from '../assets/Top1.jpeg';
import best from '../assets/best.jpeg';
import set from '../assets/set.jpg'
import set2 from '../assets/set2.jpg'
import lehenga from '../assets/lehenga.jpg';

import tshirt from '../assets/tshirt.webp'
import shirt from '../assets/shirt.jpg'
import kurta from '../assets/kurta.avif'
import kurta2 from '../assets/kurta2.jpeg'
import vid from '../assets/women.mp4'
import homeimg from '../assets/suit-removebg-preview.png';
import { HeroSection } from '../components/HeroSection';

export const HomePage = () => {
  return (
    <div className='w-full h-full'>
      {/* Hero Section */}
      <HeroSection/>
      

      {/* Best Selling Section */}
      <div className='w-11/12 lg:w-10/12 mx-auto mt-20 mb-20 h-70vh flex flex-col gap-12'>
        <h2 className='text-4xl font-semibold mx-auto text-center '>BEST SELLING</h2>
        <div className='w-20 h-1 bg-gray-500 mx-auto mb-4'></div>
        <div className='flex flex-wrap justify-center gap-8'>
          {[ suitImage2, kurta,set2, best].map((image, index) => (
            <div key={index} className='transform relative overflow-hidden hover:scale-105 transition-transform duration-300'>
              <img className='w-48 h-64 md:w-52 md:h-72 object-cover rounded-lg shadow-lg' src={image} alt='' />
              <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'></div>
            </div>
          ))}
        </div>
      </div>

      {/* Women's Wear Section */}
      <div className='h-90vh w-10/12 mx-auto rounded-xl bg-gradient-to-r from-orange-100 via-pink-100 to-yellow-100 mt-10 flex items-center py-5 px-4'>
        <div className='w-11/12 lg:w-10/12 max-w-screen-xl mx-auto h-full flex flex-col lg:flex-row items-center animate-fade-in'>
          <div className='w-full lg:w-1/2 h-full flex items-center'>
            <p className='text-3xl md:text-4xl text-gray-800 font-bold mb-6 lg:mb-0 animated-gradient-text'>Women's Wear</p>
          </div>
          <div className='w-full lg:w-1/2 grid grid-cols-2 gap-6'>
            {[lehenga, suitImage5, top, set].map((image, index) => (
              <div className='relative w-full h-full' key={index} >
                <img
                  src={image}
                  alt=''
                  className='w-full h-48 md:h-64 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105'
                />
                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-lg'></div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* video */}
      <div className="w-10/12 mx-auto m-14 bg-white md:py-12 md:px-24 ">
      <video  className="w-full h-96 mx-auto shadow-2xl rounded-md  " controls muted autoPlay>
      <source src={vid} type="video/mp4"/>
      </video>
      </div>
      {/* Men's Wear Section */}
      <div className='h-90vh bg-gradient-to-r from-blue-100 via-green-100 to-teal-100 mt-10 flex items-center w-10/12 rounded-2xl mx-auto mb-4 py-5 px-4'>
        <div className='w-11/12 lg:w-10/12 max-w-screen-xl mx-auto h-full flex flex-col lg:flex-row-reverse items-center animate-fade-in'>
          <div className='w-full lg:w-1/2 h-full flex lg:flex-row-reverse items-center'>
            <p className='text-3xl md:text-4xl text-gray-800 font-bold mb-6 lg:mb-0 animated-gradient-text'>Men's Wear</p>
          </div>
          <div className='w-full lg:w-1/2 grid grid-cols-2 gap-6'>
            {[kurta2, shirt, kurta, tshirt].map((image, index) => (
              <div className='relative w-full h-full' key={index}>
                <img
                  src={image}
                  alt=''
                  className='w-full h-48 md:h-64 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105'
                />
                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-lg'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};




// import React from 'react'

// import suitImage1 from '../assets/suit4.png'
// import suitImage2 from '../assets/suit2.jpeg'
// import suitImage3 from '../assets/suit3.jpeg'
// import suitImage5 from '../assets/suit5.jpg'
// import suitImage6 from '../assets/suitimage6.jpg'
// import suitImage7 from '../assets/suit7.jpeg'
// import top from '../assets/top.webp'
// import lehenga from '../assets/lehenga.jpg'



// import homeimg from '../assets/suit-removebg-preview.png'

// // import { Swiper, SwiperSlide } from 'swiper/react';
// // import 'swiper/css';
// // import { Navigation, Pagination, A11y } from 'swiper/modules';
// // import 'swiper/css/navigation';
// // import 'swiper/css/pagination';



// export const HomePage = () => {
//   return (
//     <div>
//         {/* hero section */}
       
//        <div className='bg-gradient-to-t from-blue-200 to-cyan-200 min-h-screen flex items-center justify-center'>
//         <div className='w-10/12 mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0'>
//             <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
//             <h1 className='text-5xl font-bold mb-4 animate-fade-in'>
//                 Stay In Style With The <br /> Latest Trends & Fashion
//             </h1>
//             <h2 className='text-xl mb-6 text-gray-700 animate-fade-in'>
//                 Express your inner style with our vast collection of clothing
//             </h2>
//             <button className='bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300 animate-bounce'>
//                 Shop Now
//             </button>
//             </div>
//             <div className='relative w-full lg:w-1/2'>
//             <div className='w-full h-full flex items-center justify-center p-8 animate-fade-in'>
//             <img src={homeimg} alt=''></img>
//             </div>
//             </div>
//         </div>
//         </div>
//         {/* best selling */}
//         {/* <div className='w-10/12 mx-auto mt-10'>
//             <h2 className='text-2xl mx-auto text-center'>Best Selling</h2>
//             <div className='flex lg:flex-row justify-center gap-4'>
                
//                 <img width="200px" height="200px" src={suitImage1} alt=''></img>
//                 <img width="200px" height="200px" src={suitImage2} alt=''></img>
//                 <img width="200px" height="200px" src={suitImage3} alt=''></img>
                
//             </div>
            
//         </div> */}

        
//         {/* Best Selling titted cards */}
// {/* <div className='w-10/12 mx-auto mt-10'>
//   <h2 className='text-2xl mx-auto text-center mb-6'>Best Selling</h2>
//   <div className='flex flex-wrap justify-center gap-6'>
//     <div className='transform -rotate-6'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage1} alt='' />
//     </div>
//     <div className='transform rotate-3'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage2} alt='' />
//     </div>
//     <div className='transform -rotate-3'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage3} alt='' />
//     </div>
//     <div className='transform rotate-6'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage1} alt='' />
//     </div>
//   </div>
// </div> */}

// {/* Best Selling */}
// <div className='w-10/12  mx-auto mt-16 mb-20'>
//   <h2 className='text-3xl font-bold mx-auto text-center mb-6'>Best Selling</h2>
//   <div className='flex flex-wrap justify-center gap-6'>
//     <div className='transform -rotate-6 relative overflow-hidden hover:scale-105 transition-transform duration-300'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage1} alt='' />
//       <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300'></div>
//       <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
        
//       </div>
//     </div>
//     <div className='transform rotate-3 relative overflow-hidden hover:scale-105 transition-transform duration-300'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage2} alt='' />
//       <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300'></div>
//       <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
        
//       </div>
//     </div>
//     <div className='transform -rotate-3 relative overflow-hidden hover:scale-105 transition-transform duration-300'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage3} alt='' />
//       <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300'></div>
//       <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
        
//       </div>
//     </div>
//     <div className='transform rotate-6 relative overflow-hidden hover:scale-105 transition-transform duration-300'>
//       <img className='w-52 h-72 object-cover rounded-lg shadow-lg' src={suitImage5} alt='' />
//       <div className='absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300'></div>
//       <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300'>
       
//       </div>
//     </div>
//   </div>
// </div>


// {/* Best Selling */}
// {/* <div className='w-full bg-gray-100 py-12'>
//   <div className='w-10/12 mx-auto'>
//     <h2 className='text-3xl font-bold text-center mb-8'>Best Selling</h2>
//     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
   
//       <div className='group relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
//         <img className='object-cover w-full h-72 sm:h-80 lg:h-96' src={suitImage1} alt='' />
//         <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
//         <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//           <h3 className='text-xl font-semibold'>Product Name</h3>
//         </div>
//       </div>

      
//       <div className='group relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
//         <img className='object-cover w-full h-72 sm:h-80 lg:h-96' src={suitImage2} alt='' />
//         <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
//         <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//           <h3 className='text-xl font-semibold'>Product Name</h3>
//         </div>
//       </div>

    
//       <div className='group relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
//         <img className='object-cover w-full h-72 sm:h-80 lg:h-96' src={suitImage3} alt='' />
//         <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
//         <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//           <h3 className='text-xl font-semibold'>Product Name</h3>
//         </div>
//       </div>

      
//       <div className='group relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
//         <img className='object-cover w-full h-72 sm:h-80 lg:h-96' src={suitImage1} alt='' />
//         <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300'></div>
//         <div className='absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//           <h3 className='text-xl font-semibold'>Product Name</h3>
//         </div>
//       </div>
//     </div>
//   </div>
// </div> */}






//         {/* women's wear */}
      
// {/* 
//         <div className='min-h-screen bg-gradient-to-r from-orange-100 via-pink-100 to-yellow-100 mt-10 flex items-center'>
//             <div className='w-10/12 max-w-screen-xl mx-auto h-full flex lg:flex-row items-center'>
//                 <div className='w-1/2 h-full flex items-center'>
//                 <p className='text-4xl text-gray-800 font-bold'>Women's Wear</p>
//                 </div>
//                 <div className='w-1/2 grid grid-cols-2 gap-6'>
//                 {[lehenga, suitImage5, top, suitImage7].map((image, index) => (
//                     <div className='relative w-4/5 h-full' key={index}>
//                     <img
                        
//                         src={image}
//                         alt=''
//                         className='w-full h-64  rounded-lg shadow-lg'
//                     />
//                     <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-lg'></div>
//                     </div>
//                 ))}
//                 </div>
//             </div>
//         </div> */}


            

// <div className='min-h-screen bg-gradient-to-r from-orange-100 via-pink-100 to-yellow-100 mt-10 flex items-center'>
//   <div className='w-10/12 max-w-screen-xl mx-auto h-full flex lg:flex-row items-center animate-fade-in'>
//     <div className='w-1/2 h-full flex items-center'>
//       <p className='text-4xl text-gray-800 font-bold'>Women's Wear</p>
//     </div>
//     <div className='w-1/2 grid grid-cols-2 gap-6'>
//       {[lehenga, suitImage5, top, suitImage7].map((image, index) => (
//         <div className='relative w-4/5 h-full' key={index}>
//           <img
//             src={image}
//             alt=''
//             className='w-full h-64 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105'
//           />
//           <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-lg'></div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>




//         {/* men's wear */}
//         <div className='h-screen bg-orange-100 mt-10'>
//             <div className=' w-10/12 max-w-maxContent mx-auto  h-full  flex lg:flex-row '>
//                 <div className='w-1/2 h-full flex  items-center'>
//                     <p className='text-4xl'>Men's Wear</p>
//                 </div>
//                 <div className='w-1/2 grid grid-cols-2 gap-6 my-auto'>
//                     <img width="200px" height="200px" src={suitImage1} alt=''></img>
//                     <img width="200px" height="200px" src={suitImage1} alt=''></img>
//                     <img width="200px" height="200px" src={suitImage1} alt=''></img>
//                     <img width="200px" height="200px" src={suitImage1} alt=''></img>
//                 </div>
//             </div>
//         </div>


//     </div>
//   )
// }


