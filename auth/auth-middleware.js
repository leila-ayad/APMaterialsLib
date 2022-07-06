const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const User = require("../users/users-model");

// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if(token) {
    jwt.verify(token, JWT_SECRET, (err, decodedJwt) => {
      if(err) {
        
        next({ status: 401, message: 'invalid jwt' });
      } else {
        User.findById(decodedJwt.member_id)
          .then(user => {
            if(user.logged_out_time > decodedJwt.iat) {
              next({ status: 401, message: 'user was logged out' });
            } else {
              req.decodedJwt = decodedJwt;
              next();
            }
          });
      }
    })

  } else {
    next({ status: 401, message: 'this endpoint is restricted!' });
  }
}

const checkUser = (userId) => (req, res, next) => {
  if (req.decodedJwt && req.decodedJwt.member_id == userId) {
    next();
  } else {
    next({ status: 403, message: "you have the wrong user!" });
  }
};

module.exports = {
  restricted,
  checkUser,
};
