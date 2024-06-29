import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Sublinks = ({ title, item, setItem, categoryLinks }) => {
  
  //const [mappedCategories, setMappedCategories]= useState([]);
  const mappedCategories=[];
  //console.log("category links",categoryLinks);
  //console.log(categoryLinks[0].name.split(' ')[1]);


return (
    <li
      onMouseOver={() => setItem(title)}
      onMouseOut={() => setItem('')}
      className='group relative hover:underline'
    >
      {title}
      {item === title && (
        <div className='absolute top-full left-0 z-10 bg-white border border-gray-200 w-48 shadow-lg'>
          {categoryLinks.map((sublink, index) => (
            <div key={index} >
              {
                !mappedCategories.includes(sublink.name.split(' ')[1]) && (
                <div className='py-2 px-4'>
                  <Link
                    to={`/category/${title.toLowerCase()}-${sublink.name.split(' ')[1]}`}
                    className='text-red-400 font-semibold'
                  >
                    {sublink.name.split(' ')[1]}
                  </Link>
                  {mappedCategories.push(sublink.name.split(' ')[1])}
                
                
            
               {sublink.name.split(' ')[2] && (
                <div className='ml-2 mt-2'>
                  {categoryLinks.map((isublink, index) => (
                  
                    isublink.name.split(' ')[1]===sublink.name.split(' ')[1] && (
                    <Link
                      key={index}
                      to={`/category/${title.toLowerCase()}-${sublink.name.split(' ')[1]}-${isublink.name.split(' ')[2]}`}
                      className='text-gray-500 hover:text-black font-semibold block'
                    >
                      {isublink.name.split(' ')[2]}
                    </Link>
                    )
                  ))}
                </div>
              )
            }
            </div>
            )
             
             }
            {/* </div> */}
            </div>
              ))
              }
         
        
      </div>
      )}
    </li>
)
}