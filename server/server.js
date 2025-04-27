import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import Product from './db/product.model.js'; 
import Cart from './db/cart.model.js';


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
  const productId = req.params.productId; // Get the productId from the URL parameter
  console.log(productId);
  const { count } = req.body; // Get the count (quantity) from the request body
  console.log(count);

  if (!count || count <= 0) {
    return res.status(400).json({ message: 'Invalid count' });
  }

  try {
    // Convert productId to an ObjectId
    const objectIdProduct = new mongoose.Types.ObjectId(productId);

    // Check if the product exists in the Product collection
    const product = await Product.findById(objectIdProduct);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
      // If no cart exists for the user, create a new cart
      let cart = new Cart({ items: [] });
    
    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === objectIdProduct.toString());

    if (existingItemIndex > -1) {
      // Product exists in cart, update the count
      cart.items[existingItemIndex].count += count;
    } else {
      // Product does not exist in cart, add a new item
      cart.items.push({ productId: objectIdProduct, count });
    }

    // Save the updated cart
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
    const cart = await Cart.findOne().populate('items.productId'); // populate product info

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    return res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/*

//delete cart item
app.delete('/api/shopping/:productId', async function (req, res) {
  //getting product id in body, filter product from cart.json, delete it 
  const clickedProductId = parseInt(req.params.productId);

  const deletedProduct = await deleteShoppingItemById(clickedProductId);

  return res.json(deletedProduct);
});

async function deleteShoppingItemById(productId) {
  const productsFile = await readCartJSONfile(); //reads JSON
  const products = productsFile.cart;

  const index = products.findIndex(p => p.id === productId);

  let deletedProduct = null;
  if (index !== -1) { // gives -1 if not found 
    deletedProduct = products[index];
    products.splice(index, 1);
  }

  const fileContentToSave = JSON.stringify({ //stringifies to JSON saves to file 
    cart: products
  }, null, 2);
  await writeFile(cartJsonPath, fileContentToSave);

  return deletedProduct;
}

app.post('/api/customers', async function (req, res) {
  const profile = req.body;
  const createdProfile = await createProfile(profile);
  return res.json(createdProfile);
});

async function createProfile(profileToSave) {
  const customerFile = await readCustomerJSONfile();
  const customers = customerFile.customers;

  profileToSave.id = generateCustomerId(customers); //generates ID
  customers.push(profileToSave); // adds to array of products

  const fileContentToSave = JSON.stringify({ //stringifies to JSON saves to file 
    customers: customers
  }, null, 2);

  await writeFile(customersJsonPath, fileContentToSave);

  return profileToSave;
}

function generateCustomerId(customers) {
  let maxId = customers[0]['id'];

  for (const customer of customers) {
    if (customer['id'] > maxId) {
      maxId = customer['id'];
    }
  }
  return maxId + 1;
}

app.get('/api/customers', async function (req, res) {
  const customerFile = await readCustomerJSONfile();
  const customer = customerFile.customers;
  const lastCustomer = customer[customer.length - 1]
  return res.json(lastCustomer);
});


*/





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




