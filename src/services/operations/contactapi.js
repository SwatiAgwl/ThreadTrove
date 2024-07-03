import { apiConnector } from "../apiConnector";
import { contactEndpoints } from "../apis";
import toast from "react-hot-toast";

const {contactUs_api}= contactEndpoints;

export const contactUs= async(data)=>{
    const toastId = toast.loading("Loading...")
    try{
        console.log("inside services ",data);
        const res= await apiConnector("POST", contactUs_api,data);
        console.log("contact us api response ", res);
        if( !res.data.success){
            throw new Error(res.data.message);
        }
        toast.success("Data sent");
    }
    catch(err){
        console.log("contact us api error ",err);
        toast.error("Some error occured, please try later");
    }
    finally{
        toast.dismiss(toastId)
    }
}