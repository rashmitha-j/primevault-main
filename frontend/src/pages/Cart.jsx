import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContents from "../components/Cart/CartContents";
import { fetchCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const userId = user?._id;
  const guestId = localStorage.getItem("guestId");

  useEffect(() => {
    dispatch(fetchCart({ userId, guestId }));
  }, [dispatch, userId, guestId]);

  if (loading) return <p className="text-center py-8">Loading cart...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cart?.products?.length > 0 ? (
        <CartContents cart={cart} userId={userId} guestId={guestId} />
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;