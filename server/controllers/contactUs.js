const mailSender= require('../utils/mailSender');

exports.contactUs= async(req,res)=>{
    try{
        const {name,email,phoneNumber,message} = req.body;

        if( !name || !email || !phoneNumber || !message){
            return res.json({
                success: false,
                message: "All fields are required",
            })
        }

        await mailSender(
            "kalamandir852@gmail.com", //to
            ` Name: ${name},
              Email: ${email},
              Phone Number: ${phoneNumber},
              Message: ${message},
            `,
            `New Contact Us form submission`,
            // email,  // from
          )
          return res.json({
            success: true,
            message: "Contact us form data sent successfully"
          })
    }
    catch(err){
        console.log("error while sending contact us form mail",err);
        return res.json({
            success:false,
            message: "Error occured while sending contact us form mail..."
        })
    }
}