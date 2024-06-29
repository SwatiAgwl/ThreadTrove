import { useNavigate } from "react-router-dom";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import toast from 'react-hot-toast'
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/userSlice";
import { setLoading } from "../../slices/authSlice";

const {sendOtp_api, login_api, signup_api,resetPasswordToken_api,resetPassword_api}= authEndpoints;


export function sendOtp(email, navigate){
    return async(dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response= await apiConnector("POST", sendOtp_api,{email});
            console.log("send otp api response ",response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")        
        }
        catch(err){
            console.log("send otp api error ",err);
            toast.error("Couldn't send OTP")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


export function signup(name,email,password,confirmPassword,phoneNum, otp,navigate){

    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response= await apiConnector("POST", signup_api,{name,email,password,confirmPassword,phoneNum,otp})
            console.log("sign up api response ", response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Account Created")
            navigate("/")
        }
        catch(err){
            console.log("sign up api error ",err);
            toast.error(`Couldn't sign up api ${err}`)
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response= await apiConnector("POST", login_api, {email,password});
            console.log("login api response ",response);
            if( !response.data.success){
                throw new Error(response.data.message);
            }
            else{
            toast.success('Login Successful');
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));

            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            navigate('/');
            }
        }
        catch(err){
            console.log("log in api error ",err);
            toast.error(`Couldn't login, ${err}`)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}


export function logout(navigate) {
    return async(dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
    //   dispatch(resetCart())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }

export function resetPasswordToken(email, setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            console.log("email",email);
            console.log(resetPasswordToken_api);
            const response= await apiConnector("POST",resetPasswordToken_api, {email} );
            console.log("reset pwd token response ",response);
            if( !response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);

        }catch(err){
            console.log("reset password token api error ",err);
            toast.error("Unable to send mail")
        }
        dispatch(setLoading(false));
    }
}


export function resetPassword(password, confirmPassword, token){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response= await apiConnector("POST",resetPassword_api, {password,confirmPassword,token});
            console.log("reset pwd api response ",response);
            if( !response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password reset successfully");
            
        }
        catch(err){
            console.log("reset pwd api error ",err);
            toast.error("Unable to reset password")
        }
        dispatch(setLoading(false));
    }
}