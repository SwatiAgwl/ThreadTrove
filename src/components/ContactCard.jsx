import React from 'react'


export const ContactCard = ({icon,heading,content}) => {
  return (
    
        <div className='border border-black'>
                <div className='flex flex-row gap-3'>
                   {icon}
                    <p>{heading}</p>
                </div>
                <div>
                    {content}
                </div>
            </div>

  )
}
