const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config(); // Load environment variables

// Connect to MongoDB using environment variable
main()
  .then(() => {
    console.log("✅ Successfully connected to MongoDB");
    initDb();
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

const initDb = async () => {
  try {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log(" Database has been seeded!");
    mongoose.connection.close(); // Close connection after done
  } catch (err) {
    console.error(" Seeding error:", err);
  }
};
