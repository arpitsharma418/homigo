const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const MODEL_URL = "mongodb://127.0.0.1:27017/wonderlust";

main().then(() => {
    console.log("Connected Succussfull!");
})
.catch((err) => {
    console.log(err);
});

async function main() {
  await mongoose.connect(MODEL_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "685f818c863129774bc2b129"}));
    await Listing.insertMany(initData.data);
    console.log("Data was Saved!");
}

initDB();