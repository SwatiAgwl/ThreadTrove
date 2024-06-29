// import React from 'react'


// export const ContactCard = ({icon,heading,content}) => {
//   return (
    
//         <div className='border border-black'>
//                 <div className='flex flex-row gap-3'>
//                    {icon}
//                     <p>{heading}</p>
//                 </div>
//                 <div>
//                     {content}
//                 </div>
//             </div>

//   )
// }

import React from 'react';

export const ContactCard = ({ icon, heading, content }) => {
  return (
    <div className='bg-gray-200 rounded-lg p-4'>
      <div className='flex items-center gap-3 mb-2'>
        <div className='text-blue-600'>{icon}</div>
        <h3 className='text-lg font-semibold'>{heading}</h3>
      </div>
      <div className='text-gray-700'>{content}</div>
    </div>
  );
};



