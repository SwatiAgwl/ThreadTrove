import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {getAllOrders_api, editProfile_api}= profileEndpoints

export async function getOrders(token){
    const toastId = toast.loading("Loading...")
        try{
            const response= await apiConnector("GET",getAllOrders_api,null,{Authorization: `Bearer ${token}`});
            console.log("get all orders api response ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            //toast.success("Displaying Orders");
            return response.data.data;
        }
        catch(err){
            console.log("Error in get all orders api ",err);
            toast.error("Unable to fetch orders")
        }
        finally{
        toast.dismiss(toastId)
        }
}


export async function editProfile(token, formData){
    const toastId = toast.loading("Loading...")
    try{
        const response= await apiConnector("POST",editProfile_api,formData,{
            Authorization: `Bearer ${token}`
        })
        console.log("edit profile api response ",response);
        if( !response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Profile updated");
    }
    catch(err){
        console.log("edit profile api errror ",err);
        toast.error("Unable to edit profile");
    }
    finally{
        toast.dismiss(toastId)
    }
}