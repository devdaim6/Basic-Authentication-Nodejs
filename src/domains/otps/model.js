const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const OtpSchema= new Schema({
    email:{ type: String, lowercase: true,index:true , trim: true ,unique:true,sparse:true},
    otp:String,
    createdAt:Date,
    expiredAt:Date
    
})

const Otp =mongoose.model("Otp",OtpSchema)



module.exports = Otp