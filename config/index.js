require("dotenv").config()



module.exports = {
    BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
    NODE_ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 9000,
    JWT_SECRET: process.env.JWT_SECRET || 'keep it secret, keep it safe',
  }
  