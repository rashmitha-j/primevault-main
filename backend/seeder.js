const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./data/products"); // Assuming this is the sample data
const Cart = require("./models/Cart");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Check if the admin user already exists
    const existingUser = await User.findOne({ email: "rrahulrahul220@gmail.com" });

    let createdUser;
    if (existingUser) {
      console.log("✅ Admin user already exists.");
      createdUser = existingUser;
    } else {
      // Create a default admin user if none exists
      createdUser = await User.create({
        name: "Admin User",
        email: "rrahulrahul220@gmail.com",
        password: "Rahulmyprimevault",
        role: "admin",
      });
      console.log("✅ Admin user created successfully!");
    }

    // ✅ Clear existing products before seeding
    await Product.deleteMany();
    console.log("✅ Existing products cleared.");

    // Assign default user ID to products
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: userID, // Assign the admin user ID to each product
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
