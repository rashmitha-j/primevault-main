const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!process.env.MONGO_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("❌ Set MONGO_URI, ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    const existingUser = await User.findOne({ email: ADMIN_EMAIL });

    let createdUser;
    if (existingUser) {
      console.log("✅ Admin user already exists.");
      createdUser = existingUser;
    } else {
      createdUser = await User.create({
        name: "Admin User",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });
      console.log("✅ Admin user created successfully!");
    }

    await Product.deleteMany();
    console.log("✅ Existing products cleared.");

    const userID = createdUser._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: userID,
    }));

    await Product.insertMany(sampleProducts);
    console.log("✅ Product data seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();