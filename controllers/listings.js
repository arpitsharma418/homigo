const listing = require("../models/listings.js");

module.exports.index = async (req, res) => {
    const allListing = await listing.find({});
    res.render("listing/index.ejs", {allListing});
}

module.exports.RenderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    let Onelisting = await listing.findById(id).populate({path: "reviews", populate: {path: "author"},}).populate("owner");
    if(!Onelisting){
        req.flash("error", "Listing you requested for does not exist.");
        res.redirect("/listing");
    }
    res.render("listing/show.ejs", {Onelisting});
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing created successfully!");
    res.redirect("/listing");
}

module.exports.editListingForm = async (req, res) => {
    let {id} = req.params;
    let Onelisting = await listing.findById(id);
    if(!Onelisting){
        req.flash("error", "Listing you are trying to edit, is no longer!");
        res.redirect("/listing");
    }
    res.render("listing/edit.ejs", {Onelisting});
}

module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let updatedListing = await listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url, filename};
        await updatedListing.save();
    }
    req.flash("success", "Listing updated successfully!");
    res.redirect("/listing");
};

module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listing");
}