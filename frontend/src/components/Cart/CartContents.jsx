import React, { useState, useEffect } from 'react';
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateCartItemQuantity
} from '../../redux/slices/cartSlice';
import { useLocation } from 'react-router-dom';

const CartContents = ({ cart, userId, guestId }) => {

  const dispatch = useDispatch();
  const location = useLocation();

  const [confirmed, setConfirmed] = useState(true);

  // Reset confirmation every time user navigates to /cart
  useEffect(() => {
    if (location.pathname === "/cart") {
      setConfirmed(true);
    }
  }, [location.pathname]);


  // Handle Quantity Update
  const handleAddToCart = (
    productId,
    delta,
    quantity,
    size,
    color
  ) => {

    if (!confirmed) return;

    const newQuantity = quantity + delta;

    if (newQuantity >= 1) {

      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );

    }

  };


  // Handle Remove Product
  const handleRemoveFromCart = (
    productId,
    size,
    color
  ) => {

    if (!confirmed) return;

    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color
      })
    );

  };


  return (

    <div className="relative">

      {/* Cart Items */}

      {cart?.products?.map((product, index) => (

        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >

          {/* Product Details */}

          <div className="flex items-start">

            {/* Product Image */}

            {product.image ? (

              <img
                src={product.image}
                alt={product.name || "Product"}
                className="w-20 h-24 object-cover mr-4 rounded"
              />

            ) : (

              <div className="w-20 h-24 bg-gray-100 rounded mr-4 flex items-center justify-center text-xs text-gray-500">

                No Image

              </div>

            )}


            {/* Product Information */}

            <div>

              <h3>
                {product.name}
              </h3>


              <p className="text-sm text-gray-500">

                Size: {product.size || "N/A"} |
                Color: {product.color || "N/A"}

              </p>


              {/* Quantity Controls */}

              <div className="flex items-center mt-2">

                {/* Decrease Quantity */}

                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>


                {/* Quantity */}

                <span className="mx-4">

                  {product.quantity}

                </span>


                {/* Increase Quantity */}

                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>

              </div>

            </div>

          </div>


          {/* Price and Remove */}

          <div>

            <p>

              ₹{product.price?.toLocaleString()}

            </p>


            {/* Remove Product */}

            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >

              <RiDeleteBin3Line
                className="h-6 w-6 mt-2 text-red-600"
              />

            </button>

          </div>

        </div>

      ))}

    </div>

  );

};

export default CartContents;
