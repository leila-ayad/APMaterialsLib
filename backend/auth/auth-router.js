const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { restricted } = require("./auth-middleware");

const router = require("express").Router();
const User = require("../../users/users-model.js");

const { BCRYPT_ROUNDS, JWT_SECRET } = require("../config");

router.post("/register", (req, res, next) => {
  let user = req.body;
  // bcrypting the password before saving
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  // never save the plain text password in the db
  user.password = hash;

  User.add(user)
    .then((saved) => {
      res.status(201).json({ message: `Great to have you, ${saved.username}` });
    })
    .catch(next); // our custom err handling middleware in server.js will trap this
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
        next({ status: 401, message: "Invalid Credentials" });
      }
    })
    .catch(next);
});

router.get("/logout", restricted, async (req, res, next) => {
  const logged_out_time = Math.floor(new Date().getTime() / 1000);
  await User.update(req.decodedJwt.subject, { logged_out_time });
  res.json("successfully logged out");
});



function generateToken(user) {
  const payload = {
    member_id: user.member_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
