const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express")

const { restricted } = require("./auth-middleware");

const router = require("express").Router();
const User = require("../users/users-model.js");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("../config");

router.post("/register", (req, res, next) => {
  let user = req.body;
  // bcrypting the password before saving
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  // never save the plain text password in the db
  user.password = hash;
  User.add(user)
    .then((saved) => {
      if (saved) {
        res
          .status(201)
          .json({ message: `Great to have you, ${saved.username}` });
      } else {
        res.status(400).json({ message: `${user.username} is already taken` });
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
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        const member_id = user.member_id;
        User.updateRefresh(member_id, refreshToken);
        //maxAge math comes out to 1d
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 24 * 60 * 60 * 1000,
        });
        console.log(res.cookie);
        res.status(200).json({
          message: `Welcome back ${user.username}...`,
          accessToken,
          username: user.username,
          member_id: user.member_id,
        });
      } else {
        next({ status: 401, message: "Please enter valid credentials" });
      }
    })
    .catch(next);
});

router.get("/refresh", async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findBy({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);
  //evaluate JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.status(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ accessToken });
  });
});

router.get("/logout", restricted, async (req, res, next) => {
  const logged_out_time = Math.floor(new Date().getTime() / 1000);
  await User.update(req.decodedJwt.member_id, { logged_out_time });
  res.json("successfully logged out");
});

module.exports = router;
