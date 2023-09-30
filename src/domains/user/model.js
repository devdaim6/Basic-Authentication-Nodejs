/* This code is defining a Mongoose schema for a user in a MongoDB database. */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const UserSchema= new Schema({
    username:{ type: String, lowercase: true,index:true , trim: true ,unique:true,sparse:true},
    email:{type:String,unique:true},
    name:{type:String},
    // age: { type: Number, min: 18, max: 65},
    password:{type:String,require:true},
    verified:{type:Boolean,default:false},
    token:String,
    
})

const User =mongoose.model("user",UserSchema)



module.exports = User