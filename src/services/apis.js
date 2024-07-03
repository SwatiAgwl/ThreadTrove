

const base_url= process.env.react_app_base_url

export const categories= {
    categories_api: base_url+ "/product/showAllCategories"
}

// auth endpoints
export const authEndpoints= {
    sendOtp_api: base_url + "/user/sendOtp",
    signup_api: base_url + "/user/signup",
    login_api: base_url + "/user/login",
    resetPasswordToken_api: base_url + "/user/resetPasswordToken",
    resetPassword_api: base_url + "/user/resetPassword"
}


// profile endpoints
export const profileEndpoints= {
    getAllOrders_api: base_url + "/profile/getAllOrders",
    editProfile_api: base_url + "/profile/updateProfile"
}

// product
export const productEndpoints= {
    createProduct_api: base_url + "/product/createProduct",
    getProductDetails_api: base_url + "/product/getProductDetails",
    getAllCategories_api: base_url + "/product/getAllCategories",
    getCategoryPageData_api: base_url + "/product/categoryPage",
    createCategory_api: base_url + "/product/createCategory",
}

// payment
export const paymentEndpoints= {
    capturePayment_api : base_url + "/payment/capturePayment",
    verifySignature_api : base_url + "/payment/verifySignature",
    sendEmailSucc_api : base_url + "/payment/sendPaymentSuccessEmail",
}

// contact
export const contactEndpoints= {
    contactUs_api : base_url + "/contact/us"
}