const nodemailer= require('nodemailer');

const mailSender= async(email, body, title)=>{
    console.log("mail user",process.env.mail_user);
    try{
        let transporter= nodemailer.createTransport({
            host:process.env.mail_host,
            auth: {
                user: process.env.mail_user,
                pass: process.env.mail_pass,
            }
        })

        let info= await transporter.sendMail({
            from: "Kala Mandir Silk Centre, Derabassi",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log("info", info);
        return info;
    }
    catch(error){
        console.log(error);
        console.log("error in sending mail")
    }
}

module.exports= mailSender;