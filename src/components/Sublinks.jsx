import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Sublinks = ({ title, item, setItem, categoryLinks }) => {
  
  //const [mappedCategories, setMappedCategories]= useState([]);
  const mappedCategories= new Set();
  //console.log("category links",categoryLinks);
  //console.log(categoryLinks[0].name.split(' ')[1]);


return (
  <li
    onMouseOver={() => setItem(title)}
    onMouseOut={() => setItem('')}
    className='group relative '

  >
    {title}
    <div className='absolute left-0 w-full h-1 bg-red-400 transform translate-y-2 transition-all duration-300 opacity-0 group-hover:opacity-100'></div>

    {item === title && (
      // <div className='absolute top-full left-0 mt-6 z-10 bg-white border border-gray-200 w-48 shadow-lg'>
      <div 
      className='absolute top-full left-0 mt-3 z-10 bg-white border border-gray-200 w-48 shadow-lg group-hover:block'
      onMouseOver={() => setItem(title)}
      onMouseOut={() => setItem('')}
      >
        {categoryLinks.map((sublink) => {
          const mainCategory = sublink.name.split(' ')[1];
          const subCategory = sublink.name.split(' ')[2];

          if (!mappedCategories.has(mainCategory)) {
            mappedCategories.add(mainCategory);
            return (
              <div key={sublink._id} className='py-2 px-4'>
                <Link
                  to={`/category/${title.toLowerCase()}-${mainCategory}`}
                  className='text-red-400 font-semibold'
                >
                  {mainCategory}
                </Link>
                {subCategory && (
                  <div className='ml-2 mt-2'>
                    {categoryLinks
                      .filter((isublink) => isublink.name.split(' ')[1] === mainCategory)
                      .map((isublink) => (
                        <Link
                          key={isublink._id}
                          to={`/category/${title.toLowerCase()}-${mainCategory}-${isublink.name.split(' ')[2]}`}
                          className='text-gray-500 hover:text-black font-semibold block'
                        >
                          {isublink.name.split(' ')[2]}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    )}
  </li>
);
};