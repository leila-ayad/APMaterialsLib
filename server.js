const express = require("express");


const credentials = require("./middleware/credentials");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const usersRouter = require("./users/users-router");
const materialsRouter = require("./auth/materials/materials-router");
const authRouter = require("./auth/auth-router.js");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");



const server = express();

// Add Access Control Allow Origin headers
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://www.abstractpicnicmaterials.com");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log(res.header)
  next();
});

server.use(credentials);

server.use(cors(corsOptions));


//urlencoded for accepting form data
server.use(bodyParser.urlencoded({ extended: false }));

server.use(express.json());

//middleware for cookies
server.use(cookieParser());

server.use("/api/users", usersRouter);
server.use("/api/materials", materialsRouter);
server.use("/api/auth", authRouter);

server.use("/", (req, res) => {
  res.send(
    "Hi! Not sure how you got here. Please return to abstractpicnic.com"
  );
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
  next();
});

module.exports = server;
