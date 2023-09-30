const { sendOtp, verifyOtp, deleteOtp } = require('../otps/controller')
const User=require('./../user/model')


const sendVerificationOTPEmail=async(email)=>{
    try {
        const existingUser=await User.findOne({email})
        if(!existingUser)
        throw Error("There is no account existing with provided email")
        
    const otpDetails={
        email,
        subject:"Email verification",
        message:"verify your email with the code below.",
        duration:"1",
    }

    const createdOtp=await sendOtp(otpDetails)
    return createdOtp
    } catch (error) {
        
    }
}


const verifyUserEmail=async (data)=>{
try {
    
    const {email}=data;
    const {otp}=data;
    const UserVerificationCheck=await User.findOne({email})
    if((UserVerificationCheck.verified)){
        throw Error("User is Already Verified!")
    } 
    // console.log(otpNew)
    const validOtp=await verifyOtp(email,otp)
if(!validOtp){
    throw Error("Invalid Code passed , Check your Inbox")
}
// console.log(email)
await User.updateOne({email},{verified:true}) 
await deleteOtp(email)
return;

} catch (error) {
throw error
}
}
module.exports={sendVerificationOTPEmail,verifyUserEmail}