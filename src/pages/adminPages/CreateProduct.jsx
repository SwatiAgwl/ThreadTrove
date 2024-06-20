import React from 'react'
import { useForm } from 'react-hook-form';
import {AddTag} from './AddTag'
import { useState } from 'react';
import { fetchCategories } from '../../services/operations/productapi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../slices/productSlice';
import { addProduct } from '../../services/operations/productapi';

export const CreateProduct = () => {
    const {token}= useSelector((state)=>state.auth);
    const dispatch= useDispatch();
    const{
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    }= useForm();

    const [categories,  setCategories]= useState([]); // why using useState can directly have categories= await fetch()
    const getCategories= async()=>{
        const categories= await fetchCategories();
        if( categories.length >0){
            setCategories(categories);
        }
    }

    useEffect(()=>{
        getCategories();
    },[])
    const onSubmit= async(data)=>{
        // create new product
        const formData= new FormData();
        // const productPrice = parseFloat(data.productPrice);

        formData.append("name",data.productName)
        formData.append("description",data.productDescription)
        formData.append("category",data.productCategory)
        formData.append("price",data.productPrice)
        //formData.append("thumbnail",data.productThumbnail)
        formData.append("tag",JSON.stringify(data.tags))

        const result= await addProduct(formData,token);
        if( result){
            dispatch(setProduct(result)); //  product slice- don't know purpose of adding this
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-8/12 max-w-maxContent bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Create Product</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="productName" className="mb-2 text-sm font-medium text-gray-700">Product Name<sup className="text-red-500">*</sup></label>
                        <input
                            id="productName"
                            name="productName"
                            placeholder="Enter Name"
                            {...register("productName", { required: true })}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.productName && (
                            <span className="text-red-500 text-sm mt-1">Product Name is required.</span>
                        )}
                    </div>
    
                    <div className="flex flex-col">
                        <label htmlFor="productPrice" className="mb-2 text-sm font-medium text-gray-700">Product Price<sup className="text-red-500">*</sup></label>
                        <input
                            id="productPrice"
                            placeholder="Enter Price"
                            {...register("productPrice", {
                                required: true,
                                valueAsNumber: true,
                            })}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.productPrice && (
                            <span className="text-red-500 text-sm mt-1">Product Price is required.</span>
                        )}
                    </div>
    
                    <div className="flex flex-col">
                        <label htmlFor="productCategory" className="mb-2 text-sm font-medium text-gray-700">Product Category<sup className="text-red-500">*</sup></label>
                        <select
                            name="productCategory"
                            id="productCategory"
                            defaultValue=""
                            {...register("productCategory", { required: true })}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Choose a category</option>
                            {categories.map((categ, index) => (
                                <option value={categ?._id} key={index}>
                                    {categ?.name}
                                </option>
                            ))}
                        </select>
                        {errors.productCategory && (
                            <span className="text-red-500 text-sm mt-1">Product category is required.</span>
                        )}
                    </div>
    
                    {/* tags */}
                    <AddTag
                        id="tags"
                        label="Tags"
                        register={register}
                        getValues={getValues}
                        setValue={setValue}
                        errors={errors}
                        name="tags"
                    />
                    {/* thumbnail */}
    
                    <div className="flex flex-col">
                        <label htmlFor="productDescription" className="mb-2 text-sm font-medium text-gray-700">Product Description<sup className="text-red-500">*</sup></label>
                        <textarea
                            id="productDescription"
                            placeholder="Enter Description"
                            {...register("productDescription", { required: true })}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.productDescription && (
                            <span className="text-red-500 text-sm mt-1">Product Description is required.</span>
                        )}
                    </div>
    
                    <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Create</button>
                </form>
            </div>
        </div>
    )
    
}
