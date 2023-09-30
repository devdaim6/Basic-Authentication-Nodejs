const jwt=require('jsonwebtoken')
const {TOKEN_KEY,TOKEN_EXPIRY}=process.env;
/**
 * The function `createToken` is an asynchronous function that generates a JSON Web Token (JWT) using
 * the `jwt.sign` method from the `jsonwebtoken` library.
 * @param tokenData - The `tokenData` parameter is an object that contains the data you want to include
 * in the token. This data can be any information that you want to associate with the token, such as
 * user details or permissions.
 * @param [tokenKey] - The tokenKey parameter is the secret key used to sign the token. It is used to
 * verify the authenticity of the token when it is received by the server.
 * @param [expiresIn] - The expiresIn parameter specifies the expiration time of the token. It
 * determines how long the token will be valid before it expires.
 * @returns a token, which is generated using the `jwt.sign()` method.
 */

const createToken=async (
    tokenData,
    tokenKey=TOKEN_KEY,
    expiresIn=TOKEN_EXPIRY,
)=>{
    try {
        const token=await jwt.sign(tokenData,tokenKey,{
            expiresIn,
        })
        return token
    } catch (error) {
        throw error

    }
}







module.exports=createToken