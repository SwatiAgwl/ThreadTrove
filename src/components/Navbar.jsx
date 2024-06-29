// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import brandLogo from '../assets/logo.png'
// import { useDispatch, useSelector } from 'react-redux'
// import { IoIosHeartEmpty } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import { SlHandbag } from "react-icons/sl";
// import { useState } from 'react';
// import { ConfirmationModal } from './ConfirmationModal';
// import {logout} from '../services/operations/authapi'
// import { fetchCategories } from '../services/operations/productapi';
// import { useEffect } from 'react';

// export const Navbar = () => {

//     const {token}= useSelector((state)=> state.auth);
//     const {totalItems}= useSelector((state)=> state.bag);
//     const {totItems}= useSelector((state)=> state.wishlist);
//     const {user}= useSelector((state)=> state.user);

//     const dispatch= useDispatch();
//     const navigate= useNavigate();
//     const [confirmationModal, setConfirmationModal]= useState(null);
//     //console.log("before ",confirmationModal.text1);

//     const [item,setItem]= useState("");
//     const handleMouseOver= (text)=>{
//         setItem(text);
//     }
//     const handleMouseOut=()=>{
//         setItem("");
//     }

//     // fetch all categories
//     const [categories,  setCategories]= useState([]); // why using useState can directly have categories= await fetch()
//     const getCategories= async()=>{
//         const categories= await fetchCategories();
//         if( categories.length >0){
//             setCategories(categories);
//         }
//     }
//     useEffect(()=>{
//         getCategories();
//     },[])

//     // setting links acc to nav bar hover
//     const [categoryLinks, setCategoryLinks]= useState([]);
//     useEffect(()=>{
//         if( categories&& item){
//             const categLinks= categories.filter( (category)=> category.name.split(' ')[0] === item);
//             setCategoryLinks(categLinks);
//         }
//     },[item,categories])

//   return (
//     <div className='max-h-14 ' >
//         <div className='w-11/12 mx-auto flex lg:flex-row justify-between items-center '>
//             {/* logo */}
//             <Link to={'/'}>
//                 <img src={brandLogo} alt='' width="80" height="60"></img>
//             </Link>
//             {/* nav links */}
//             <nav>
//                 <ul className='flex lg:flex-row gap-5'>

//             {['Women', 'Men', 'Brands', 'More'].map((category) => (
//               <li
//                 key={category}
//                 className="group relative"
//                 onMouseOver={() => handleMouseOver(category)}
//                 onMouseOut={handleMouseOut}
//               >
//                 {category}
//                 {item === category && (
//                   <div className="absolute top-full left-0 mt-2 hidden group-hover:block bg-white border border-gray-200 z-50">
//                     {categoryLinks.map((sublink, index) => (
//                       <div key={index} className="py-2">
//                         <Link
//                           to={`/category/${item}/${sublink.name.split(' ')[1]}`}
//                           className="block px-4 py-2"
//                         >
//                           {sublink.name.split(' ')[1]}
//                         </Link>
//                         {sublink.name.split(' ')[2] && (
//                           <div className="ml-4">
//                             {categoryLinks.map((sublink, subIndex) => (
//                               <Link
//                                 key={subIndex}
//                                 to={`/category/${item}/${sublink.name.split(' ')[1]}/${sublink.name.split(' ')[2]}`}
//                                 className="block px-4 py-2"
//                               >
//                                 {sublink.name.split(' ')[2]}
//                               </Link>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </li>
//             ))}
//                     {/* <li  onMouseOver={() => handleMouseOver('Women')} onMouseOut={handleMouseOut} className='group relative'>Women</li>
//                     <li onMouseOver={() => handleMouseOver('Men')} onMouseOut={handleMouseOut}>Men</li>
//                     <li onMouseOver={() => handleMouseOver('Brands')} onMouseOut={handleMouseOut}>Brands</li>
//                     <li onMouseOver={() => handleMouseOver('More')} onMouseOut={handleMouseOut}>More</li> */}
//                     <li><Link to={'/about'}>About Us</Link></li>
//                     <li><Link to={'/contact'}>Contact Us</Link></li>
//                 </ul>
//             </nav>


//             {/* login/signup button or profile,wishlist,bag */}
//             <div className='flex gap-2'>
//                 {
//                     token== null && (
//                         <div>
//                             <Link to={'/login'}><button className='border border-b-2'>Log In</button></Link>
//                             <Link to={'/signup'}><button className='border border-b-2'>Sign Up</button></Link> 
//                         </div>
//                     )
//                 }
//                 {
//                     token !== null && (
//                         <div className='group items-center relative'>
//                             <CgProfile />
//                             <div className='absolute  top-full mt-2 -left-10  opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white border border-gray-100 text-gray-500 py-2 px-2 z-50'>
//                                 <ul>
//                                     <li ><Link to={'/edit-profile'} className='whitespace-nowrap'>Edit Profile</Link></li>
//                                     <li onClick={()=> setConfirmationModal({
//                                         text1: "Are you sure?", 
//                                         text2: "You will be logged out of your account",
//                                         btn1text: "Logout",
//                                         btn2text: "Cancel",
//                                         btn1handler: ()=> dispatch(logout(navigate)),
//                                         btn2handler: ()=> setConfirmationModal(null),
//                                     }
//                                     )}>Logout</li>
                                    
//                                 </ul>
                                
                                
//                             </div >
                            
//                         </div>
                       
//                     )
//                 }
//                 {
//                     user && user?.isAdmin !== true && (
//                        <div className='flex flex-row gap-2'>
//                         <Link to={'/wishlist'}><IoIosHeartEmpty /> { totItems >0 && ( <span>{totItems}</span>)}</Link>
//                         <Link to={'/bag'}><SlHandbag /> { totalItems >0 && ( <span>{totalItems}</span>)}</Link>
//                         </div>
//                     )
//                 }
    
//             </div>
//         </div>

//         {
//             confirmationModal && (<ConfirmationModal modalData={confirmationModal} />)
//         }

//         {/* {
//             item && categoryLinks.length>0 && (
//                 <div> 
//                     {
//                         categoryLinks.map( (sublink,index)=>(
//                                 <div key={index} >
//                                 <Link to={`/category/${item}/${sublink.name.split(' ')[1]}`} className='text-red-400'>{sublink.name.split(' ')[1]}</Link>
//                                 {
//                                     sublink.name.split(' ')[2] &&
//                                     <div>
//                                         {
//                                             categoryLinks.map( (sublink,index)=>(
//                                                 <Link key={index} to={`/category/${item}/${sublink.name.split(' ')[1]}/${sublink.name.split(' ')[2]}`}>{sublink.name.split(' ')[2]}</Link>
//                                             ))
//                                         }
//                                     </div>
//                                 }
//                                 </div>
//                         ))
//                     }
//                 </div>
//             )
//         } */}
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import brandLogo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosHeartEmpty } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { SlHandbag } from 'react-icons/sl';
import { ConfirmationModal } from './ConfirmationModal';
import { logout } from '../services/operations/authapi';

import { Sublinks } from './Sublinks';
import { fetchCategories } from '../services/operations/productapi';

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.bag);
  const { totItems } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [item, setItem] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryLinks, setCategoryLinks] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (categories && item) {
      const categLinks = categories.filter(
        (category) => category.name.split(' ')[0] === item
      );
      setCategoryLinks(categLinks);
    }
  }, [item, categories]);


return (
  <nav className='bg-white shadow-lg '>
    <div className='container mx-auto flex items-center justify-between'>
      {/* Logo */}
      <Link to={user && user.isAdmin ? '/admin/dashboard' : '/'}>
        <img src={brandLogo} alt='Brand Logo' className='w-20 h-auto ' />
      </Link>

      {/* Navigation Links */}
      <ul className='flex gap-5'>
        <Sublinks title='Women' item={item} setItem={setItem} categoryLinks={categoryLinks} />
        <Sublinks title='Men' item={item} setItem={setItem} categoryLinks={categoryLinks} />
        <Sublinks title='Brands' item={item} setItem={setItem} categoryLinks={categoryLinks} />
        <Sublinks title='More' item={item} setItem={setItem} categoryLinks={categoryLinks} />
        <li>
          <Link className='hover:underline' to={'/about'}>
            About Us
          </Link>
        </li>
        <li>
          <Link className='hover:underline' to={'/contact'}>
            Contact Us
          </Link>
        </li>
      </ul>

      {/* User Actions */}
      <div className='flex gap-2 items-center'>
        {token == null ? (
          <div className='flex gap-2'>
            <Link to={'/login'}>
              <button className='border border-gray-200 px-3 py-1 rounded-md'>Log In</button>
            </Link>
            <Link to={'/signup'}>
              <button className='border border-gray-200 px-3 py-1 rounded-md'>Sign Up</button>
            </Link>
          </div>
        ) : (
          <div className='relative group'>
            <CgProfile className='text-gray-600 text-xl cursor-pointer' />
            <div className='absolute top-full mt-2 -left-10 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white w-28 border border-gray-200 text-gray-500  block py-2 px-3 z-10 rounded-md'>
              <ul>
                <li >
                  <Link to={'/orders'} >Orders</Link>
                </li>
                <li>
                  <Link to={'/edit-profile'}>Edit Profile</Link>
                </li>
                <li
                  onClick={() =>
                    setConfirmationModal({
                      text1: 'Are you sure?',
                      text2: 'You will be logged out of your account',
                      btn1text: 'Logout',
                      btn2text: 'Cancel',
                      btn1handler: () => dispatch(logout(navigate)),
                      btn2handler: () => setConfirmationModal(null),
                    })
                  }
                  className='cursor-pointer'
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Wishlist and Bag */}
        {user && !user.isAdmin && (
          <div className='flex gap-2'>
            <Link to={'/wishlist'} className='flex items-center relative'>
              <IoIosHeartEmpty className='text-gray-600 text-xl' />
              {/* {totItems > 0 && <span className='bg-red-500 text-white text-xs px-2 py-1 absolute top-0 right-0  transform translate-x-1/2 -translate-y-1/2 rounded-full'>{totItems}</span>} */}
            </Link>
            <Link to={'/bag'} className='flex items-center relative'>
              <SlHandbag className='text-gray-600 text-xl' />
              {totalItems > 0 && <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>{totalItems}</span>}
            </Link>
          </div>
        )}
      </div>
    </div>

    {/* Confirmation Modal */}
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </nav>
);
};

