const Review = require("../models/review.js");
const listing = require("../models/listings.js");

module.exports.createReview = async(req, res) => {
    let reviewListing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;
    reviewListing.reviews.push(newReview);

    await newReview.save();
    await reviewListing.save();

    req.flash("success", "New review added successfully!");

    res.redirect(`/listing/${reviewListing.id}`);
}

module.exports.destroyReview = async(req, res) => {
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listing/${id}`);
}