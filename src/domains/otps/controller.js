const generateOtp=require('../../utils/generateOtp')
const sendEmail=require('../../utils/sendEmail')
const {hashData,verifyHashedData} = require('../../utils/hashData')
const Otp = require('./model')
const {AUTH_EMAIL} = process.env
const sendOtp =async ({email,subject,message,duration=1})=>{
try {
    
    if(!(email && subject && message)){
        throw Error('provides valid values')
    }

    //delete any previous otp
    await Otp.deleteOne({email})

    //generate new otp
    const generatedOtp=await generateOtp();


    //send Email
    const mailOptions={
        from:AUTH_EMAIL,
        to:email,
        subject,
        html:`<div style='padding:2rem;'><p>${message}</p><p style='color:tomato;font-size:25px;letter-spacing:2px;'><strong>${generatedOtp}<strong></p><p style='font-size:15px;'>This Code Expires in<strong> 5 </strong> minutes</p></div>`
    }

    await sendEmail(mailOptions)


    //save hashed Otp
    const hashedotp=await hashData(generatedOtp)
    const newOtp=await new Otp({
        email,
        otp:hashedotp,
        createdAt:Date.now(),
        expiredAt:Date.now()+300000*+duration,
    })
    const createdOTPRecord=await newOtp.save();
    return createdOTPRecord;

} catch (error) {
    throw error
}

}


const verifyOtp=async (email,otp)=>{
    try {
        // const {email,otp}=data;
        // console.log(email+otp)
        if(!(email && otp)){
            throw Error('provide values for email , otp')
        }

        //ensuring otp is correct
        const matchedOtpRecord=await Otp.findOne({email})

        if(!matchedOtpRecord){
            throw Error("Request for an OTP first!")
        }
        const {expiredAt}=matchedOtpRecord;
        // console.log(expiredAt)

        if(!(expiredAt>Date.now())){
           await Otp.deleteOne({email});
             throw Error("Code has Expired ,Request for a new one")
         }

        const hashedOtp=matchedOtpRecord.otp;
        const validOtp=await verifyHashedData(otp,hashedOtp);
        return validOtp
    } catch (error) {
        throw error;

    }
}

const deleteOtp=async (email)=>{
    try {
        await Otp.deleteOne({email})
    } catch (error) {
        throw error
    }
}
module.exports={sendOtp,verifyOtp,deleteOtp}