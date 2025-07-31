import express from 'express';
import mongoose from 'mongoose';
import Customer from './db/customer.model.js';

const app = express();
app.use(express.json());

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(() => console.log("Customer service connected to MongoDB"));

app.post('/api/customers', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
});

app.get('/api/customers', async (req, res) => {
  const lastCustomer = await Customer.findOne().sort({ _id: -1 });
  res.json(lastCustomer);
});

app.listen(8081, () => console.log("Customer service running on 8081"));
