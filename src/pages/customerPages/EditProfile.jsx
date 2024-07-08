import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { editProfile } from '../../services/operations/profileapi';


export const EditProfile = () => {
    const {user}= useSelector( (state)=> state.user);
    const {token}= useSelector( (state)=> state.auth);
    // console.log("token ",token);
 
    useEffect(()=>{
        console.log("user",user);
        console.log("additonal details ",user.additionalDetails.gender);
        console.log("additonal details ",user.additionalDetails);
    },[user]);
     

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const submitProfileForm = async (data) => {
       console.log("Form Data - ", data)
       await editProfile(token, data);
       //toast.success("Profile updated");
  
    }

return (
  <div className="h-fit py-2 md:h-screen flex justify-center items-center bg-gray-100">
    <div className="w-11/12 h-fit md:w-8/12 mx-auto border border-gray-300 px-6 py-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Details</h1>

      <div className="mb-4">
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <form onSubmit={handleSubmit(submitProfileForm)}>
        <fieldset className="border border-gray-300 px-4 py-4 mb-4 rounded-lg">
          <legend className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-semibold">Additional Details</legend>

          <div className="mb-4">
            <label htmlFor="phoneNum" className="block text-gray-700 mb-2">Phone Number:</label>
            <input
              id="phoneNum"
              type="number"
              minLength={10}
              maxLength={10}
              className="border border-gray-400 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              {...register("phoneNum", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                validate: {
                  isTenDigits: (value) => value.length === 10 || "Phone number must be exactly 10 digits.",
                  isNumeric: (value) => /^\d+$/.test(value) || "Phone number must contain only digits.",
              }
            })}
              defaultValue={user?.phoneNum}
            />
            {errors.phoneNum && (
                <span className='text-red-500'>
                  {errors.phoneNum.message}
                </span>
              )}
          </div>

          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div className="w-full md:w-1/2 md:pr-2">
              <label htmlFor="gender" className="block text-gray-700 mb-2">Gender:</label>
              <input
                type="text"
                id="gender"
                name="gender"
                className="border border-gray-400 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              />
               {errors.gender && (
                <span  className='text-red-500'>
                  Please enter your Gender.
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label htmlFor="dob" className="block text-gray-700 mb-2">DOB:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="border border-gray-400 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                {...register("dob", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dob}
              />
              {errors.dob && (
                <span className='text-red-500'>
                  {errors.dob.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between mb-4">
            <div className="w-full md:w-1/2 md:pr-2">
              <label htmlFor="city" className="block text-gray-700 mb-2">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                className="border border-gray-400 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                {...register("city", { required: true })}
                defaultValue={user?.additionalDetails?.city}
              />
              {errors.city && (
                <span  className='text-red-500'>
                  Please enter your city.
                </span>
              )}
            </div>
            <div className="w-full md:w-1/2 md:pl-2">
              <label htmlFor="state" className="block text-gray-700 mb-2">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                className="border border-gray-400 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                {...register("state", { required: true })}
                defaultValue={user?.additionalDetails?.state}
              />
              {errors.state && (
                <span  className='text-red-500'>
                  Please enter your state.
                </span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 mb-2">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              className="border border-gray-400 rounded py-2 px-3 w-full focus:outline-none focus:border-blue-500"
              {...register("country", { required: true })}
              defaultValue={user?.additionalDetails?.country}
            />
            {errors.country && (
                <span  className='text-red-500'>
                  Please enter your country.
                </span>
              )}
          </div>

          <button
            type="submit"
            className="border border-gray-300 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        </fieldset>
      </form>

      {/* Additional sections like change password or delete account can be added here */}
    </div>
  </div>
);
}