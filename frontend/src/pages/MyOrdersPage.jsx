import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        {/* Scrollable Table Container */}
        <div className="overflow-x-auto max-h-[500px] sm:max-h-[600px]">
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
           
              <tr>
                <th className="py-2 px-4 sm:py-3">Image</th>
                <th className="py-2 px-4 sm:py-3">Order ID</th>
                <th className="py-2 px-4 sm:py-3">Created</th>
                <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                <th className="py-2 px-4 sm:py-3">Phone</th>
                <th className="py-2 px-4 sm:py-3">Items</th>
                <th className="py-2 px-4 sm:py-3">Total Price</th>
                <th className="py-2 px-4 sm:py-3">Payment</th>
                <th className="py-2 px-4 sm:py-3">Delivery</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => {
                  const totalPrice = order.totalPrice || 0;

                  return (
                    <tr
                      key={order._id}
                      onClick={() => handleRowClick(order._id)}
                      className="border-b hover:border-gray-300 cursor-pointer"
                    >
                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        {order.orderItems?.[0]?.image ? (
                          <img
                            src={order.orderItems[0].image}
                            alt={order.orderItems[0].name}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                        #{order._id}
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        {order.createdAt
                          ? `${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`
                          : 'N/A'}
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        {order.shippingAddress
                          ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`
                          : 'N/A'}
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        {order.shippingAddress?.phone || 'Phone not available'}
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        {order.orderItems && order.orderItems.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-1">
                            {order.orderItems.map((item, index) => (
                              <li key={index} className="text-sm text-gray-700">
                                {item.name} (x{item.quantity || 1})
                                <div className="text-xs text-gray-500">
                                  Size: {item.size || 'N/A'}, Color: {item.color || 'N/A'}
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span>No items</span>
                        )}
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4 font-semibold text-gray-900">
                        ₹{totalPrice.toLocaleString()}
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        <span
                          className={`${
                            order.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                        >
                          {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </td>

                      <td className="py-2 px-2 sm:py-4 sm:px-4">
                        <span
                          className={`${
                            order.deliveryStatus === 'delivered'
                              ? 'bg-green-100 text-green-700'
                              : order.deliveryStatus === 'shipped'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                        >
                          {order.deliveryStatus
                            ? order.deliveryStatus.charAt(0).toUpperCase() +
                              order.deliveryStatus.slice(1)
                            : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-4 px-4 text-center text-gray-500">
                    You have no orders.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
