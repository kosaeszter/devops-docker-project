import express from 'express';
import mongoose from 'mongoose';
import Product from './db/product.model.js';
import Cart from './db/cart.model.js';

const app = express();
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(() => console.log("ProductCart service connected to MongoDB"));

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/shopping/:productId', async (req, res) => {
  const { count } = req.body;
  const productId = req.params.productId;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Not found" });

  let cart = await Cart.findOne() || new Cart({ items: [] });
  const idx = cart.items.findIndex(i => i.productId.toString() === productId);

  if (idx >= 0) {
    cart.items[idx].count += count;
  } else {
    cart.items.push({ productId, count });
  }

  await cart.save();
  res.status(201).json(cart);
});

app.get('/api/shopping', async (req, res) => {
  const cart = await Cart.findOne().populate('items.productId');
  res.json(cart || { items: [] });
});

app.delete('/api/shopping/:productId', async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne();
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
});

app.listen(8080, () => console.log("ProductCart service running on 8080"));
