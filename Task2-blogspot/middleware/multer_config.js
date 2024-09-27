const multer = require("multer");

// Configure multer memory storage
const storage = multer.memoryStorage();

// File filter to allow only images (including JPG)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, GIF, and WEBP are allowed!"
      ),
      false
    ); // Reject file
  }
};

// Configure multer upload without file size limit
const upload = multer({
  storage,
  fileFilter,
}); // Assuming a single file upload with field name 'image'

module.exports = upload;
