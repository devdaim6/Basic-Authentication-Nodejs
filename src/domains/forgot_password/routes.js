const express = require("express");
const router = express.Router();
const {
  sendPasswordResetOtpEmail,
  userPasswordReset,
} = require("./controller");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("An Email is Required!");
    }
    const createdPasswordResetOtp = await sendPasswordResetOtpEmail(email);

    res.status(200).json(createdPasswordResetOtp);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/reset", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!otp) {
      throw Error("An Otp is Required!");
    }
    if (!(email && newPassword)) {
      throw Error("New Password is Required!");
    }
    if (newPassword.length < 8) {
      if (
        !(
          (newPassword.includes("!") ||
            newPassword.includes("@") ||
            newPassword.includes("#") ||
            newPassword.includes("$") ||
            newPassword.includes("%") ||
            newPassword.includes("^") ||
            newPassword.includes("*") ||
            newPassword.includes("(") ||
            newPassword.includes(")") ||
            newPassword.includes("{") ||
            newPassword.includes("}") ||
            newPassword.includes("|") ||
            newPassword.includes("/") ||
            newPassword.includes(";") ||
            newPassword.includes(":") ||
            newPassword.includes(".") ||
            newPassword.includes(",") ||
            newPassword.includes("<") ||
            newPassword.includes(">") ||
            newPassword.includes("`") ||
            newPassword.includes("&")) &&
          newPassword.includes(/^[0-9]*$/)
        )
      ) {
        res.status(415).json({
          message: "Password is Weak,Must include specials symbols and numbers",
        });
      }
      res.status(408).json({ message: "Password Length must be > 8" });
    }
    await userPasswordReset(email, otp, newPassword);

    res.status(200).json({ email, passwordReset: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
