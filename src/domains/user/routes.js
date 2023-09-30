const express = require("express");
const router = express.Router();
const { createNewUser, authenticateUser } = require("./controller");

//Signup
router.post("/register", async (req, res) => {
  try {
    /* `const {name,email,password}= req.body;` is destructuring the `req.body` object and extracting
       the `name`, `email`, and `password` properties. This allows you to directly access these
       properties without having to use `req.body.name`, `req.body.email`, and `req.body.password`. */
    let { username, email, name, password } = req.body;

    if (!(username && name && email && password)) {
      throw Error({ message: "Empty Input Fields" });
    } else if (!/^[A-Za-z][A-Za-z ]*$/.test(name)) {
      res.status(402).json({ message: "Enter Valid Name (Characters only)" });
    } else if (!/^[a-z][a-z0-9]*$/.test(username)) {
      // if (!/^[a-z0=9]*$/.test(username)) {
      //   res
      //     .status(402)
      //     .json({ message: "Username should start with a character!" });
      // }
      res.status(401).json({
        message:
          "Username should contain only LowerCase and start with a character!",
      });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error({ message: "Enter Valid Email Address" });
    } else if (password.length < 8) {
      if (
        !(
          (password.includes("!") ||
            password.includes("@") ||
            password.includes("#") ||
            password.includes("$") ||
            password.includes("%") ||
            password.includes("^") ||
            password.includes("*") ||
            password.includes("(") ||
            password.includes(")") ||
            password.includes("{") ||
            password.includes("}") ||
            password.includes("|") ||
            password.includes("/") ||
            password.includes(";") ||
            password.includes(":") ||
            password.includes(".") ||
            password.includes(",") ||
            password.includes("<") ||
            password.includes(">") ||
            password.includes("`") ||
            password.includes("&")) &&
          password.includes(/^[0-9]*$/)
        )
      ) {
        res.status(415).json({
          message: "Password is Weak,Must include specials symbols and numbers",
        });
      }
      res.status(408).json({ message: "Password Length must be > 8" });
    } else {
      /* This code is creating a new user by calling the `createNewUser` function and passing in the
         `name`, `email`, and `password` as parameters. It then waits for the `createNewUser` function
         to complete using the `await` keyword. */
      const newUser = await createNewUser({
        username,
        email,
        name,
        password,
      });
      // await sendVerificationOTPEmail(email);
      res
        .status(200)
        .json({ message: "Account Created Successfully. Login Now!", newUser });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let { username, password } = req.body;

    password = password.trim();
    username = username.trim();
    if (!(username && password)) {
      throw Error("Empty Credentials Supplied!");
    }

    const authenticatedUser = await authenticateUser(req, res, {
      username,
      password,
    });
  

    res.status(200).json(authenticatedUser).send('LOGGED IN');
  } catch (error) {
    res.status(400).json();
  }
});


router.post('/logout',(req,res)=>{
  req.session.destroy();
  res.json({message:"logged Out"})
})
module.exports = router;
