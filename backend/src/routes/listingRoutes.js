const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.js");
const upload = require("../middleware/upload.js");
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController.js");
const {
  createReview,
  deleteReview,
} = require("../controllers/reviewController.js");

// Listing routes
router.get("/", getListings);
router.get("/:id", getListing);
router.post("/", protect, upload.single("image"), createListing);
router.put("/:id", protect, upload.single("image"), updateListing);
router.delete("/:id", protect, deleteListing);

// Review routes
router.post("/:id/reviews", protect, createReview);
router.delete("/:id/reviews/:reviewId", protect, deleteReview);

module.exports = router;
