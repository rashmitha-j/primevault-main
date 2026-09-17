const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      size: { type: String },           // ✅ add this
      color: { type: String },          // ✅ add this
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    }
  ],
  
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Cash on Delivery',  // ✅ default is COD
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  freeCashUsed: {
    type: Number,
    default: 0,    // ✅ we can track how much free cash was used
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing',
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
