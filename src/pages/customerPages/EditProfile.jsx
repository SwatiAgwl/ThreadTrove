import React from 'react'
import { useSelector } from 'react-redux'

export const EditProfile = () => {
    const {user}= useSelector( (state)=> state.user);
    const {token}= useSelector( (state)=> state.auth);
    console.log("token ",token);
    console.log("user",user);

  return (
    <div className='h-screen'>
        <div className=' w-8/12 mx-auto border border-black-2 px-5 py-2'>
            <h1 className='text-2xl text-bold'>Edit Details</h1>

            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phoneNum}</p>
            

            <form>
            <fieldset className='border border-black-2 px-2'>
                <legend className='bg-gray-200'>Additional Details</legend>

                <div className='flex flex-row justify-between'>
                    <label for="gender">Gender:</label>
                    <input type="text" id="gender" name="gender"/><br/>
                    <label for="dob">DOB:</label>
                    <input type="date" id="dob" name="dob"/><br/>
                </div>


                <div className='flex flex-row justify-between'>
                    <label for="city">City:</label>
                    <input type="text" id="city" name="city"/><br/>
                    <label for="state">State:</label>
                    <input type="text" id="state" name="state"/><br/>
                </div>

                <label for="countty">Country:</label>
                <input type="text" id="country" name="country"/><br/>
                <button className='border border-black-2 bg-red-400'>Save</button>

            </fieldset>

            {/* change password */}
            {/* delete account */}
            </form>
        </div>

    </div>
  )
}
