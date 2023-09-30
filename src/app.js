require("./config/db");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const app = express();
// const bodyParser=require('body-parser')
const cors = require("cors");
const routes = require("./routes");
// const MongoDBStore = require("connect-mongodb-session")(session);
const { MONGO_URI } = process.env;

// const store = new MongoDBStore({
//   uri: MONGO_URI,
//   collection: "user",
// });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json())
app.use(cors());

// app.use(
//   require("express-session")({
//     secret: "This is a secret",
//     cookie: {
//       maxAge: 1000 * 60 * 5,
//       secure: true,
//     },
//     store: store,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
app.use("/", routes);

module.exports = app;
