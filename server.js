const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");

const usersRouter = require("./users/users-router");
const materialsRouter = require('./auth/materials/materials-router')
const authRouter = require('./auth/auth-router.js');
const { default: knex } = require("knex");
const bodyParser = require("body-parser");


const server = express();


server.use(bodyParser.urlencoded({ extended: false}))
server.use(express.json());
server.use(cors());
server.use(fileUpload());

server.use("/api/users", usersRouter);
server.use("/api/materials", materialsRouter)
server.use("/api/auth", authRouter)

server.post('/upload', async (req, res) => {
  const {name, data} = req.files.pic;
  if (name && data) {
    //its erroring here. For some reason "insert" isn't a method. I need to figure out how to get the img db from the video here.
    await knex.insert({name: name, img: data}).into('img')
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
})

server.use("/", (req, res) => {
  res.send("Hi! Not sure how you got here. Please return to abstractpicnic.com")
})



server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
  next()
});

module.exports = server;
