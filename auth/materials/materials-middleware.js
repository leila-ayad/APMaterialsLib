const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Uploads is the Upload_folder_name

    cb(null, "./Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, path.extname(file.originalname) + Date.now() + ".jpg");
  },
});
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optiona

const upload = multer({   storage: storage })


module.exports = {
  upload
};
