import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">

      <table className="min-w-[1200px] w-full text-left text-sm text-gray-700">

          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Shipping Address</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((order) => (

                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
             
                  <td className="p-4">{order.user?.name || 'N/A'}</td>
                  <td className="p-4">{order.shippingAddress?.phone || 'N/A'}</td>
                  <td className="p-4">
                    {order.shippingAddress?.address}, {order.shippingAddress?.city},<br />
                    {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                     <p> Created At: </p>
                      {order.createdAt
                        ? `${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`
                        : 'N/A'}
                    </td>
                  </td>
                  <td className="p-4">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 mb-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            Qty: {item.quantity} | Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}
                          </p>
                          <p className="text-sm">₹{item.price?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 font-bold text-gray-800">
                    ₹{order.totalPrice?.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="capitalize">{order.paymentMethod}</span>
                      <span className={`text-xs font-semibold ${order.paymentStatus === 'pending' ? 'text-red-500' : 'text-green-600'}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusChange(order._id, 'Delivered')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Mark Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
