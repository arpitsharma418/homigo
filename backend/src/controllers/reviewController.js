const Listing = require("../models/Listing");
const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment are required." });
    }

    const numericRating = Number(rating);
    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    const review = await Review.create({
      rating: numericRating,
      comment: comment.trim(),
      author: req.user._id,
    });

    listing.reviews.push(review._id);
    await listing.save();

    const populatedReview = await Review.findById(review._id).populate(
      "author",
      "username fullName email avatar"
    );
    res.status(201).json({ review: populatedReview });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    if (review.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can delete only your own review." });
    }

    await Listing.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.reviewId },
    });
    await Review.findByIdAndDelete(req.params.reviewId);

    res.json({ message: "Review deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReview, deleteReview };
