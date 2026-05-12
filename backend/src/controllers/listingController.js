const cloudinary = require("../config/cloudinary");
const Listing = require("../models/Listing");

function validateListing(body) {
  const requiredFields = [
    "title",
    "description",
    "price",
    "location",
    "country",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return `${field} is required.`;
    }
  }

  if (Number(body.price) < 1) {
    return "Price must be at least 1.";
  }

  if (body.title.trim().length < 3) {
    return "Title must be at least 3 characters.";
  }

  if (body.description.trim().length < 10) {
    return "Description must be at least 10 characters.";
  }

  return null;
}

async function uploadImage(file) {
  if (!file) {
    return null;
  }

  const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "homigo",
    resource_type: "image",
  });

  return {
    url: result.secure_url,
    filename: result.public_id,
  };
}

function buildListingData(body) {
  return {
    title: body.title.trim(),
    description: body.description.trim(),
    price: Number(body.price),
    location: body.location.trim(),
    country: body.country.trim(),
  };
}

// Get All Listings
const getListings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalListings = await Listing.countDocuments();

    const listings = await Listing.find({})
      .populate("owner", "username fullName email avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      listings,
      currentPage: page,
      totalPages: Math.ceil(totalListings / limit),
      totalListings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Listing by its ID
const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("owner", "username fullName email avatar")
      .populate({
        path: "reviews",
        options: { sort: { createdAt: -1 } },
        populate: { path: "author", select: "username fullName email avatar" },
      });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.json({ listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListingsByOwner = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.params.id })
      .populate("owner", "username fullName email avatar")
      .sort({ createdAt: -1 });

    res.json({ listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a listing
const createListing = async (req, res) => {
  try {
    const validationError = validateListing(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const listingData = buildListingData(req.body);
    const uploadedImage = await uploadImage(req.file);

    if (uploadedImage) {
      listingData.image = uploadedImage;
    } else if (req.body.imageUrl) {
      listingData.image = {
        url: req.body.imageUrl,
        filename: "external-image",
      };
    }

    const listing = await Listing.create({
      ...listingData,
      owner: req.user._id,
    });

    res.status(201).json({ listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can update only your own listing." });
    }

    const validationError = validateListing(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    Object.assign(listing, buildListingData(req.body));

    const uploadedImage = await uploadImage(req.file);
    if (uploadedImage) {
      listing.image = uploadedImage;
    } else if (req.body.imageUrl) {
      listing.image = {
        url: req.body.imageUrl,
        filename: "external-image",
      };
    }

    await listing.save();
    res.json({ listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    if (listing.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can delete only your own listing." });
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getListingsByOwner,
};
