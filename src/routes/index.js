const express=require('express')
const router=express.Router()
const userRoute = require("./../domains/user")
const EmailVerificationRoute = require("./../domains/email_verification")
const ForgotPasswordRoute = require("./../domains/forgot_password")


router.use("/user",userRoute)
router.use("/email_verification",EmailVerificationRoute)
router.use("/forgot_password",ForgotPasswordRoute)

module.exports = router ;