const multer = require("multer");

function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong.";

  if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = err.code === "LIMIT_FILE_SIZE" ? "Image must be smaller than 10 MB." : err.message;
  }

  if (message === "Only image files are allowed.") {
    statusCode = 400;
  }

  if (process.env.NODE_ENV !== "test") {
    console.error(message);
  }

  res.status(statusCode).json({ message });
}

module.exports = { notFound, errorHandler };
