const User=require('./model')
const {hashData,verifyHashedData}=require('../../utils/hashData')
const createToken=require('../../utils/createToken');
const session = require('express-session');




const createNewUser=async(data)=>{
    try {
        const {username,name,email,password}=data;

        const existingUser=await User.findOne({email})
        if(existingUser){
            throw Error("User already exists")
        }

       
        //hash pass

        const hashedPass=await hashData(password);

        const newUser = new User({
            username,
            email,
            name,
            password:hashedPass,
        })
        const createdUser=await newUser.save()
        return createdUser;

    } catch (error) {
        throw error
    }
}



const authenticateUser = async (req,res,data)=>{

    try {
        const {username,password}=data;
        const fetchedUser=await User.findOne({username})

        if(!fetchedUser){
            res.status(401).json({message:"No account assosciated with this username.Create a new One!"})
        }
         if(!fetchedUser.verified){
            res.status(402).json({message:"Account is Not Verified Yet!"})
        } 
        
        const hashedPass=fetchedUser.password
       const passwordMatch =await verifyHashedData(password,hashedPass)
     
       if(!passwordMatch){
        res.status(403).json({message:"Invalid Credentials Entered!"})
       }

       //craete user token
const tokenData={userId:fetchedUser._id,username}
const token=await createToken(tokenData)
    
fetchedUser.token=token;
return fetchedUser

} catch (error) {
        throw error
    }
}



module.exports={createNewUser,authenticateUser}