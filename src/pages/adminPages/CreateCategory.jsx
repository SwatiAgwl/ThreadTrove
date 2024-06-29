import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { addCategory } from '../../services/operations/productapi';

export const CreateCategory = () => {
    const {token}= useSelector((state)=>state.auth);
    const{
        register,
        handleSubmit,
        formState: {errors},
    }= useForm();

    const onSubmit= async(data)=>{
        const formData= new FormData();
        formData.append("name",data.category);

        const result= await addCategory(formData,token);
    }

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Create Category</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
              Category Name<sup className="text-red-500">*</sup>
            </label>
            <input
              id="category"
              name="category"
              placeholder="Category name"
              {...register("category", { required: true })}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.category && (
              <span className="text-red-500 text-sm mt-1">Category Name is required</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 "
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};
