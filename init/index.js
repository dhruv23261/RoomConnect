const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("./models/listing.js"); // ✅ correct relative path
require("dotenv").config(); // Load environment variables

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Successfully connected to MongoDB");

    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("✅ Sample data inserted");

    mongoose.connection.close(); // close after seeding
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();
