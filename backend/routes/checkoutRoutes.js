const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");


const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post('/api/orders', async (req, res) => {
    try {
        const { shippingInfo, items, paymentMethod, totalPrice, userId } = req.body;

        if (!shippingInfo || !items || !paymentMethod || !totalPrice || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = new Order({
            shippingInfo,
            items,
            paymentMethod,
            totalPrice,
            userId,
            status: 'Processing',
            createdAt: Date.now(),
        });

        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) =>{
    const {paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({message: "Checkout not found"});
        }
            if(paymentStatus === "paid"){
                checkout.isPaid = true;
                checkout.paymentStatus = paymentStatus;
                checkout.paymentDetails = paymentDetails;
                checkout.paidAt = Date.now();
                await checkout.save();

                res.status(200).json(checkout);
            }
            else{
                 res.status(400).json({message: " Invalid Payment Status"});
            }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access  Private
router.post("/:id/finalize", protect, async(req, res) =>{
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({message: "Checkout not found"});
        }

        if(checkout.isPaid && !checkout.isFinalized){
            // create the final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus:"paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark the chekcout as finalized
             checkout.isFinalized = true;
             checkout.finalizedAt = Date.now();
             await checkout.save();

             // delete the cart associated with the user afte finalzed
             await Cart.findOneAndDelete({ user: checkout.user});
             res.status(201).json(finalOrder);

        } else if(checkout.isFinalized){
            res.status(400).json({message: "Checkout already finalized"});
        }
        else{
            res.status(400).json({message: "Checkout is not paid"});
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Server error"});  
    }
});

module.exports = router;