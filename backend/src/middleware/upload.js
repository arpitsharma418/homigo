const multer = require("multer");

const storage = multer.memoryStorage();
const maxFileSize = 5 * 1024 * 1024;

const upload = multer({
  storage,
  limits: {
    fileSize: maxFileSize,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Only image files are allowed."));
  },
});

module.exports = upload;
