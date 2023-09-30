const bcrypt = require('bcrypt')

const hashData = async (data,saltRounds=10)=>{
try {
    /* The code `const hashedData=await bcrypt.hash(data,saltRounds); return hashedData;` is using the
    `bcrypt` library to hash the `data` using the specified `saltRounds`. */
    const hashedData=await bcrypt.hash(data,saltRounds);
    return hashedData;

} catch (error) {
    throw error
}
}


const verifyHashedData= async (unhashed,hashed)=>{

    try {
       /* The code `const match=await bcrypt.compare(unhashed,hashed)` is using the `bcrypt` library to
       compare the unhashed data (`unhashed`) with the hashed data (`hashed`). It returns a boolean
       value (`true` or `false`) indicating whether the unhashed data matches the hashed data. */
        const match=await bcrypt.compare(unhashed,hashed)
        return match;

    } catch (error) {
        throw error
    }
}
module.exports={hashData,verifyHashedData}