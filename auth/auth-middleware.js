const jwt = require("jsonwebtoken");

const User = require("../users/users-model");

// AUTHENTICATION
const restricted = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.username;
    req.member_id = decoded.member_id
    next();
  });
};


module.exports = {
  restricted,
};
