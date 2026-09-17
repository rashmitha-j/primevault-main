const express = require('express');
const Reseller = require('../models/Reseller');  // Assuming you have a Reseller model
const router = express.Router();  // Use router, not app

// Reseller Registration Route
router.post('/register', async (req, res) => {
  const { name, email, phone, shopName, address, password } = req.body;

  try {
    // Check if reseller already exists by email
    const existingReseller = await Reseller.findOne({ email });
    if (existingReseller) {
      return res.status(400).json({ message: 'You are already registered as a reseller!' });
    }

    // Create a new reseller
    const newReseller = new Reseller({
      name,
      email,
      phone,
      shopName,
      address,
      password, // You may want to hash the password before saving
    });

    await newReseller.save();
    res.status(201).json({ message: 'You have successfully registered as a reseller!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});








// Check if reseller is already registered by email
router.get('/check/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const reseller = await Reseller.findOne({ email });
    if (reseller) {
      return res.status(200).json({ isRegistered: true });
    } else {
      return res.status(200).json({ isRegistered: false });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});




// Admin route to get all resellers
router.get('/admin/resellers', async (req, res) => {
  try {
    const resellers = await Reseller.find({});
    res.json(resellers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resellers.' });
  }
});

module.exports = router;  // Export the router so it can be used in server.js
