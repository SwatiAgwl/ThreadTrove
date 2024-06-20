import { apiConnector } from "../apiConnector";
import { productEndpoints } from "../apis";
import toast from "react-hot-toast";


const {createProduct_api ,getAllCategories_api, getCategoryPageData_api} = productEndpoints
// fetch all categories
export const fetchCategories= async()=>{
    let result=[];
    try{
        const response= await apiConnector("GET",getAllCategories_api,);
        console.log("get all categories api response ",response);
        if( !response.data.success){
            throw new Error(response.data.message);
        }
        result= response?.data?.data;
        //toast.success("Categories data fetched");
         
    }
    catch(err){
        console.log("get all categories api error ",err);
        toast.error("Couldn't fetch all categories");
    }
    return result;
}

// add new product
export const addProduct= async(data,token)=>{
    try{
        const response= await apiConnector("POST", createProduct_api,data, {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        });
        console.log("create product api response ",response);
        if (!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("New Product Added")
    }
    catch(err){
        console.log("create product api error ",err);
        toast.error("Couldn't create product");
    }
}


// get category page data
export const getCategoryPageData= async(categoryId)=>{
    let result="";
    try{
        const response= await apiConnector("POST",getCategoryPageData_api,{categoryId});
        console.log("get category page api response ",response);
        if( !response.data.success){
            throw new Error(response.data.message);
        }
        result= response?.data?.data;
        //toast.success("Category Page data fetched");
    }
    catch(err){
        console.log("get category page data api error ",err);
        toast.error("Couldn't fetch category page data");
    }
    return result;
}