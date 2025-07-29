/*import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import Product from './db/product.model.js';
import Cart from './db/cart.model.js';
import Customer from './db/customer.model.js';


const app = express();
app.use(express.json());

dotenv.config();
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}


// SHOPPING PROCESS

app.get('/api/products', async function (req, res) {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.error("Error fetching products from MongoDB:", err);
    return res.status(500).json({ message: "Error fetching products" });
  }
});

//Add to cart 
app.post('/api/shopping/:productId', async (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  const { count } = req.body;
  console.log(count);

  if (!count || count <= 0) {
    return res.status(400).json({ message: 'Invalid count' });
  }

  try {
    const objectIdProduct = new mongoose.Types.ObjectId(productId);
    const product = await Product.findById(objectIdProduct);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   // Find the existing cart
   let cart = await Cart.findOne();
    
   if (!cart) {
     // No cart exists, create a new one
     cart = new Cart({ items: [] });
   }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === objectIdProduct.toString());

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].count += count;
    } else {
      cart.items.push({ productId: objectIdProduct, count });
    }


    await cart.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read cart 
app.get('/api/shopping', async function (req, res) {
  try {
    const cart = await Cart.findOne().populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


//delete cart item
app.delete('/api/shopping/:productId', async function (req, res) {
  const productId = req.params.productId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  try {
    const cart = await Cart.findOne(); // assuming you only have one cart

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the product from the cart items array
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();

    res.json({ success: true, message: 'Product removed from cart', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/customers', async function (req, res) {
  try {
    const profileData = req.body;
    const newCustomer = new Customer(profileData);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save customer' });
  }
});


app.get('/api/customers', async function (req, res) {
  try {
    const lastCustomer = await Customer.findOne().sort({ _id: -1 }).exec();
    res.json(lastCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch customer' });
  }
});


// when server stops mongoose connection closes
process.on('SIGINT', async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

async function startServer() {
  await connectToMongoDB();

  app.listen(8080, function () {
    console.log(`Server is running at: http://localhost:8080`);
  });
}

startServer().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});
*/

import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

async function startServer() {
  //await connectToMongoDB();

  app.listen(8080, function () {
    console.log(`Server is running at: http://localhost:8080`);
  });
}

startServer().catch((err) => {
  console.error("Error starting the server:", err);
  process.exit(1);
});



