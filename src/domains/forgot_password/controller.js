const { hashData } = require("../../utils/hashData");
const User = require(".././user/model");
const { sendOtp, verifyOtp, deleteOtp } = require("../otps/controller");


const sendPasswordResetOtpEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw Error("There is no account associated with this email");
    }

    const otpDetails = {
      email,
      subject: "Password Reset Request",
      message: "The OTP(One-Time Password) to reset your password is below.",
      duration: 1,
    };

    const createdOtp = await sendOtp(otpDetails);
    return createdOtp;
  } catch (error) {
    throw error;
  }
};


const userPasswordReset = async (email, otp, newPassword) => {
  try {
    const validOtp = await verifyOtp( email, otp );

    if (!validOtp) {
      throw Error("Invalid Otp Entered, Please check your inbox!");
    }

    if (!newPassword.length > 8) {
      throw Error(
        "New Password is too short, please create a strong password!"
      );
    }

    const hashedPass = await hashData(newPassword);
    await User.updateOne({ email }, { password: hashedPass });
    await deleteOtp(email);
    return;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendPasswordResetOtpEmail, userPasswordReset };
