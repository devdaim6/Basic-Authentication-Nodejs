const nodemailer=require('nodemailer')
const {AUTH_PASS,AUTH_EMAIL}=process.env

/* This code is creating a transporter object using the nodemailer library. The transporter object is
responsible for sending emails. */
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    // host:"smtp-mail.outlook.com",
    auth:{
user:AUTH_EMAIL,
pass:AUTH_PASS
    }
})

/* The code `transporter.verify((error,success)=>{...})` is used to verify the connection configuration
of the transporter object. */

transporter.verify((error,success)=>{
if(error){
    console.log(error)
}else{
    console.log(success)
}
})


/**
 * The function `sendEmail` is an asynchronous function that sends an email using the `transporter`
 * object and returns nothing.
 * @param mailOptions - The `mailOptions` parameter is an object that contains the details of the email
 * to be sent. It typically includes properties such as `from` (the sender's email address), `to` (the
 * recipient's email address), `subject` (the subject of the email), and `text`
 * @returns nothing (undefined).
 */
const sendEmail = async(mailOptions)=>{
    try {
        await transporter.sendMail(mailOptions)
        return
    } catch (error) {
        throw error
    }
}

module.exports=sendEmail;