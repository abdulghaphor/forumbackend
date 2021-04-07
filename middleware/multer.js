// image upload library for express
const multer = require("multer");

// method for storing files
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

// middleware that allows uploading
const upload = multer({
  storage,
});

module.exports = upload;
