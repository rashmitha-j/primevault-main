const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Check if the admin user already exists
    const existingUser = await User.findOne({ email: "primevault.admin@gmail.com" });

    let createdUser;
    if (existingUser) {
      console.log("✅ Admin user already exists.");
      createdUser = existingUser;
    } else {
      // Create a default admin user if none exists
      createdUser = await User.create({
        name: "Admin User",
        email: "primevault.admin@gmail.com",
        password: "Pv#Admin2026xQ",
        role: "admin",
      });
      console.log("✅ Admin user created successfully!");
    }

    // Clear existing products before seeding
    await Product.deleteMany();
    console.log("✅ Existing products cleared.");

    // Assign the admin user ID to each product
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: userID,
    }));

    // Insert the new products
    await Product.insertMany(sampleProducts);
    console.log("✅ Product data seeded successfully!");

    // Exit after seeding
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();