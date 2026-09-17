import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';

import { clearCart, clearCartInDB } from "../../redux/slices/cartSlice";

// Import payment method images
import phonePeImg from '../../assets/phonepay.jpeg'; // Replace with actual paths
import googlePayImg from '../../assets/googlepay.webp';
import visaImg from '../../assets/visa.jpg';
import codImg from '../../assets/cashondelivery.jpg';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
    phone: "",
    paymentMethod: "COD",
  });

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClearCart = () => {
    dispatch(clearCartInDB({ userId: user?._id, guestId: localStorage.getItem("guestId") }));
    dispatch(clearCart());
  };

  const placeOrder = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const userId = userInfo?._id;

      if (!userId) {
        alert("User not logged in.");
        return;
      }

      const order = {
        totalPrice: cart.totalPrice,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.pincode,
          country: formData.country,
          phone: formData.phone,
          name: `${formData.firstName} ${formData.lastName}`,
        },
        user: userId,
        orderItems: cart.products.map((product) => ({
          ...product,
          size: product.size || "N/A",
          color: product.color || "N/A",
        })),
        paymentMethod: "Cash on Delivery",
        paymentStatus: "pending",
      };

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, order, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (res.status === 200) {
        alert("Order Placed Successfully!");
        handleClearCart();
        localStorage.removeItem("cart");
        window.location.href = "/my-orders";
      }
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
      <div className='bg-white rounded-lg p-6'>
        <h2 className="text-xl text-center font-bold mb-4">Checkout</h2>

        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            value={user ? user.email : ""}
            className='w-full p-2 border rounded bg-gray-100'
            disabled
          />
        </div>

        <div className='mb-4 grid grid-cols-2 gap-4'>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />

        <div className='mb-4 grid grid-cols-2 gap-4'>
          <input
            name="city"
            placeholder="City"
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
          <input
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <input
          name="country"
          placeholder="Country"
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border p-2 mb-4 w-full"
          required
        />

        <div className="mb-4">
          <p>Total Payable: <strong>₹{cart.totalPrice?.toLocaleString()}</strong></p>
        </div>

        <div className="mt-4 mb-6">
          <h4 className="font-semibold text-lg mb-4">Payment Methods</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-start border p-2 rounded-md w-full">
              <img src={phonePeImg} alt="PhonePe" className="w-8 h-8 object-contain mr-2" />
              <span className="text-sm">PhonePe</span>
              <span className="text-sm ml-2 text-red-600">Currently Unavailable</span>
            </div>

            <div className="flex items-center justify-start border p-2 rounded-md w-full">
              <img src={googlePayImg} alt="Google Pay" className="w-8 h-8 object-contain mr-2" />
              <span className="text-sm">Google Pay</span>
              <span className="text-sm ml-2 text-red-600">Currently Unavailable</span>
            </div>

            <div className="flex items-center justify-start border p-2 rounded-md w-full">
              <img src={visaImg} alt="Visa" className="w-8 h-8 object-contain mr-2" />
              <span className="text-sm">Visa</span>
              <span className="text-sm ml-2 text-red-600">Currently Unavailable</span>
            </div>

            <div className="flex items-center justify-start border p-2 rounded-md w-full">
              <img src={codImg} alt="Cash on Delivery" className="w-8 h-8 object-contain mr-2" />
              <span className="text-sm">COD</span>
              <span className="text-sm ml-2 text-green-600">Available</span>
            </div>
          </div>
        </div>

        <button
          onClick={placeOrder}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Place Order (COD)
        </button>
      </div>

      <div className='bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-lg mb-4'>Order Summary</h3>

        <div className='border-t py-4 mb-4'>
          {cart.products.map((product, index) => (
            <div
              key={index}
              className='flex items-start justify-between py-2 border-b'
            >
              <div className='flex items-start'>
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-20 h-24 object-cover mr-4'
                />
                <div>
                  <h3 className='text-md'>{product.name}</h3>
                  <p className='text-gray-500'>Size: {product.size || 'N/A'}</p>
                  <p className='text-gray-500'>Color: {product.color || 'N/A'}</p>
                </div>
              </div>
              <p className='text-xl'>₹{product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center text-lg mb-4'>
          <p>Subtotal</p>
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className='flex justify-between items-center text-lg'>
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
          <p>Total</p>
          <p>₹{cart.totalPrice?.toLocaleString()}</p>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
