const express = require("express");
const cors = require("cors");

const usersRouter = require("./users/users-router");
const materialsRouter = require('./auth/materials/materials-router')
const authRouter = require('./auth/auth-router.js')


const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/materials", materialsRouter)
server.use("/api/auth", authRouter)



server.use((err, req, res) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
