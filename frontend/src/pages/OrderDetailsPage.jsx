import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails } from '../redux/slices/orderSlice';
import './OrderDetailsPage.css'; // ✅ You'll create this CSS file for animations

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    console.log("Dispatching fetch for order ID:", orderId);
    if (orderId) {
      dispatch(fetchOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderDetails) return <p>No Order details found</p>;

  const orderedDate = new Date(orderDetails.createdAt);
  const estimatedDelivery = new Date(orderedDate);
  estimatedDelivery.setDate(orderedDate.getDate() + 8);

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>

     {/* ✅ Animated Order Confirmation */}
<div className="flex flex-col items-center justify-center mb-8 animate-fadeIn">
  <div className="checkmark-circle">
    <div className="background"></div>
    <div className="checkmark draw"></div>
  </div>
  <h3 className="text-xl font-semibold mt-4 text-green-700">Order Confirmed</h3>
  <p className="text-gray-700 text-sm">Thank you for shopping with <span className="font-bold text-green-800">Prime Vault!</span>!</p>
</div>


      {/* Heading */}
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>
        Order Details for order #{orderId}
      </h2>

      <div className='p-4 sm:p-6 rounded-lg border'>
        {/* Order Info */}
        <div className='flex flex-col sm:flex-row justify-between mb-8'>
          <div>
            <h3 className='text-lg md:text-xl font-semibold'>Order Id: #{orderDetails._id}</h3>
            <p className='text-gray-600'>Ordered on: {orderedDate.toLocaleDateString()}</p>
            <p className='text-gray-600'>Estimated Delivery: {estimatedDelivery.toLocaleDateString()}</p>
          </div>

          <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
            <span className={`${orderDetails.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
              {orderDetails.isPaid ? "Approved" : "Pending"}
            </span>
            <span className={`${orderDetails.isDelivered ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
              {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
            </span>
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
          <div>
            <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
          </div>

          <div>
            <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
            <p>Name: {orderDetails.shippingAddress?.name}</p>
            <p>Phone: {orderDetails.shippingAddress?.phone}</p>
            <p>Address: {orderDetails.shippingAddress?.address}</p>
            <p>City: {orderDetails.shippingAddress?.city}</p>
            <p>Country: {orderDetails.shippingAddress?.country}</p>
            <p>Pincode: {orderDetails.shippingAddress?.postalCode}</p>
          </div>
        </div>

        {/* Product List */}
        <div className='overflow-x-auto'>
          <h4 className='text-lg font-semibold mb-4'>Products</h4>
          <table className='min-w-full text-gray-600 mb-4'>
            <thead className='bg-gray-300'>
              <tr>
                <th className='py-2 px-4'>Name</th>
                <th className='py-2 px-4'>Unit Price</th>
                <th className='py-2 px-4'>Quantity</th>
                <th className='py-2 px-4'>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.orderItems.map((item) => (
                <tr key={item.productId} className='border-b'>
                  <td className='py-2 px-4 flex items-center'>
                    <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-lg mr-4' />
                    <Link className='text-blue-500 hover:underline' to={`/product/${item.productId}`}>
                      {item.name}
                    </Link>
                  </td>
                  <td className='py-2 px-4'>₹{item.price}</td>
                  <td className='py-2 px-4'>{item.quantity}</td>
                  <td className='py-2 px-4'>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Back Link */}
        <Link className='text-blue-500 hover:underline' to="/my-orders">
          Back to My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
