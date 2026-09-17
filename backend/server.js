const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");
const resellerRoutes = require('./routes/resellerRoutes');



const bodyParser = require('body-parser');
const path = require('path');








const app = express();
app.use(express.json());
app.use(cors());
// Serve the public/assets folder
app.use('/assets', express.static('public/assets'));


dotenv.config();



// Parse incoming JSON requests
app.use(bodyParser.json());





const PORT = process.env.PORT ||  3000;

// connect to mongo DB 
connectDB();
 





//Api routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/", subscribeRoute);
app.use('/api/reseller', resellerRoutes);



// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products" , productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});


app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});


module.exports = app; 