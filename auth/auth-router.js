const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const  { restricted } = require("./auth-middleware");

const router = require("express").Router();
const User = require("../users/users-model.js");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("../config");
const e = require("express");

router.post("/register", (req, res, next) => {
  let user = req.body;
  // bcrypting the password before saving
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  user.password = hash;
  User.add(user)
    .then((saved) => {
      if(saved) {
        res.status(201).json({ message: `Great to have you, ${saved.username}` });
      }
      else {
        res.status(400).json({message: `${user.username} is already taken`})
      }
    })
    // our custom err handling middleware in server.js traps all other errors with code 500
    .catch(next); 
});

router.post("/login", (req, res, next) => {
  let { username, password } = req.body;
  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome back ${user.username}...`,
          token,
        });
      } else {
        next({ status: 401, message: "Please enter valid credentials" });
      }
    })
    .catch(next);
});

router.get("/logout", restricted, async (req, res, next) => {
  const logged_out_time = Math.floor(new Date().getTime() / 1000);
  await User.update(req.decodedJwt.member_id, { logged_out_time });
  res.json("successfully logged out");
});


function generateToken(user) {
  console.log(user)
  const payload = {
    member_id: user.member_id,
    username: user.username,
    password: user.password
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
