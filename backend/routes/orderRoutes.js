const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware"); // ✅ correct import

const router = express.Router();

// Place a new order
router.post("/", protect, async (req, res) => {  // ✅ use protect here
  console.log("Incoming order data:", req.body); 

  try {
    const order = new Order({
      user: req.user.id, // ✅ from authMiddleware (protect)
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      totalPrice: req.body.totalPrice,
      paymentMethod: req.body.paymentMethod || "Cash on Delivery",
      phone: req.body.phone  
    });

    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
});

// Get user's orders
router.get('/my-orders', protect, async (req, res) => {  // ✅ protect this route also
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }); // ✅ correct query
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
});

// routes/orderRoutes.js
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
