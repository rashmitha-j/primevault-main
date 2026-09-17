import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calulateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 7);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
      <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
        Thank You for Your Order!
      </h1>

      {checkout && (
        <div className='p-6 rounded-lg border'>
          {/* Order ID, date, and estimated delivery */}
          <div className='flex justify-between mb-12'>
            <div>
              <h2 className='text-xl font-semibold'>Order ID: {checkout._id}</h2>
              <p className='text-gray-500'>Order Date: {new Date(checkout.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className='text-emerald-700 font-medium'>
                Estimated Delivery: {calulateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Shipping details */}
          <div className='mb-8'>
            <h3 className='text-lg font-semibold mb-2'>Shipping Information</h3>
            <p className='text-gray-700'>{checkout.shippingAddress.name}</p>
            <p className='text-gray-700'>Phone: {checkout.shippingAddress.phone}</p>
            <p className='text-gray-700'>Email: {checkout.shippingAddress.email}</p>
            <p className='text-gray-700'>
              Address: {checkout.shippingAddress.address}, {checkout.shippingAddress.city}, {checkout.shippingAddress.postalCode}, {checkout.shippingAddress.country}
            </p>
          </div>

          {/* Ordered items */}
          <div className='mb-12'>
            <h3 className='text-lg font-semibold mb-4'>Items Ordered</h3>
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className='flex items-center mb-4'>
                <img src={item.image} alt={item.name} className='w-16 h-16 object-cover rounded-md mr-4' />
                <div>
                  <h4 className='text-md font-semibold'>{item.name}</h4>
                  <p className='text-sm text-gray-500'>{item.color} | {item.size}</p>
                </div>
                <div className='ml-auto text-right'>
                  <p className='text-md'>₹{item.price}</p>
                  <p className='text-sm text-gray-500'>Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Payment and Delivery Info */}
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <h4 className='text-lg font-semibold mb-2'>Payment Method</h4>
              <p className='text-gray-600'>
                {checkout.paymentMethod === "cod" ? "Cash on Delivery" : "PayPal"}
              </p>
              <p className='text-gray-500 text-sm'>
                Payment Status: {checkout.isPaid ? "Paid" : "Pending"}
              </p>
            </div>

            <div>
              <h4 className='text-lg font-semibold mb-2'>Delivery Address</h4>
              <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
              <p className='text-gray-600'>{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
