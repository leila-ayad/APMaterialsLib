const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: "https://intense-island-04875.herokuapp.com",
  //  (origin, callback) => {
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
