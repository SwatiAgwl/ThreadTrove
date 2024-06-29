import React from 'react'
import { useSelector } from 'react-redux'

export const EditProfile = () => {
    const {user}= useSelector( (state)=> state.user);
    const {token}= useSelector( (state)=> state.auth);
    console.log("token ",token);
    console.log("user",user);

//   return (
//     <div className='h-screen'>
//         <div className=' w-8/12 mx-auto border border-black-2 px-5 py-2'>
//             <h1 className='text-2xl text-bold'>Edit Details</h1>

//             <p>{user.name}</p>
//             <p>{user.email}</p>
//             <p>{user.phoneNum}</p>
            

//             <form>
//             <fieldset className='border border-black-2 px-2'>
//                 <legend className='bg-gray-200'>Additional Details</legend>

//                 <div className='flex flex-row justify-between'>
//                     <label for="gender">Gender:</label>
//                     <input type="text" id="gender" name="gender"/><br/>
//                     <label for="dob">DOB:</label>
//                     <input type="date" id="dob" name="dob"/><br/>
//                 </div>


//                 <div className='flex flex-row justify-between'>
//                     <label for="city">City:</label>
//                     <input type="text" id="city" name="city"/><br/>
//                     <label for="state">State:</label>
//                     <input type="text" id="state" name="state"/><br/>
//                 </div>

//                 <label htmlFor="countty">Country:</label>
//                 <input type="text" id="country" name="country"/><br/>
//                 <button className='border border-black-2 bg-red-400'>Save</button>

//             </fieldset>

//             {/* change password */}
//             {/* delete account */}
//             </form>
//         </div>

//     </div>
//   )
// }

return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-8/12 mx-auto border border-black-2 px-5 py-2 rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>Edit Details</h1>
  
        <div className='mb-4'>
          <p className='mb-2'><strong>Name:</strong> {user.name}</p>
          <p className='mb-2'><strong>Email:</strong> {user.email}</p>
          <p className='mb-2'><strong>Phone Number:</strong> {user.phoneNum}</p>
        </div>
  
        <form>
          <fieldset className='border border-black-2 px-4 py-2 mb-4 rounded-lg'>
            <legend className='bg-gray-200 px-2 py-1 rounded'>Additional Details</legend>
  
            <div className='flex flex-col md:flex-row md:justify-between mb-2'>
              <label htmlFor="gender" className='mb-2'>Gender:</label>
              <input type="text" id="gender" name="gender" className='border border-gray-400 rounded py-1 px-2 w-full md:w-auto mb-2 md:mb-0'/>
              <label htmlFor="dob" className='mb-2 md:ml-4'>DOB:</label>
              <input type="date" id="dob" name="dob" className='border border-gray-400 rounded py-1 px-2 w-full md:w-auto'/>
            </div>
  
            <div className='flex flex-col md:flex-row md:justify-between mb-2'>
              <label htmlFor="city" className='mb-2'>City:</label>
              <input type="text" id="city" name="city" className='border border-gray-400 rounded py-1 px-2 w-full md:w-auto mb-2 md:mb-0'/>
              <label htmlFor="state" className='mb-2 md:ml-4'>State:</label>
              <input type="text" id="state" name="state" className='border border-gray-400 rounded py-1 px-2 w-full md:w-auto'/>
            </div>
  
            <label htmlFor="country" className='mb-2'>Country:</label>
            <input type="text" id="country" name="country" className='border border-gray-400 rounded py-1 px-2 w-full mb-2'/>
  
            <button type="submit" className='border border-black-2 bg-red-400 py-1 px-4 rounded-lg hover:bg-red-500 transition duration-300'>Save</button>
          </fieldset>
        </form>
  
        {/* Additional sections like change password or delete account can be added here */}
      </div>
    </div>
  );
}  