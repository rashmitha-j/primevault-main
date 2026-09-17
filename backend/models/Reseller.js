const mongoose = require('mongoose');

const resellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  shopName: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true }, // You should hash this in production!
}, { timestamps: true });

module.exports = mongoose.model('Reseller', resellerSchema);
