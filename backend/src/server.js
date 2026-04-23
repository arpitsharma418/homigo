const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorHandler.js");
const authRoutes = require("./routes/authRoutes.js");
const listingRoutes = require("./routes/listingRoutes.js");
const cookieParser = require("cookie-parser");

function getAllowedOrigins() {
  const configuredOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins;
}

main()
  .then((res) => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URI || process.env.ATLASDB_URL);
}

// middlewares
app.use(
  cors({
    origin: getAllowedOrigins(),
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({ message: "Homigo API is running" });
});

app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is Running on port", process.env.PORT);
});
