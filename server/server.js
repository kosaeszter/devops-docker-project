import express from 'express';
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

const customersJsonPath = join(__dirname, 'customers.json');
const productsJsonPath = join(__dirname, 'products.json');
const cartJsonPath = join(__dirname, 'cart.json');

async function readProductJSONfile() {
  const fileContent = await readFile(productsJsonPath);
  return JSON.parse(fileContent);
}

async function readCartJSONfile() {
  const fileContent = await readFile(cartJsonPath);
  return JSON.parse(fileContent);
}

async function readCustomerJSONfile() {
  const fileContent = await readFile(customersJsonPath);
  return JSON.parse(fileContent);
}


const staticPath = join(__dirname, "..", "client");
app.use('/static', express.static(staticPath));

//PAGES

app.get('/edit', function (req, res) {
  const productsHTMLPath = join(__dirname, '..', 'client', 'products.html');
  res.sendFile(productsHTMLPath);
});

app.get('/customer', function (req, res) {
  const productsHTMLPath = join(__dirname, '..', 'client', 'customers.html');
  res.sendFile(productsHTMLPath);
});

app.get('/main', function (req, res) {
  const productsHTMLPath = join(__dirname, '..', 'client', 'main.html');
  res.sendFile(productsHTMLPath);
});

//EDITOR PAGE 
app.post('/api/products', async function (req, res) {
  const product = req.body;
  console.log(product);

  const createdProduct = await createProduct(product);
  console.log(createdProduct);

  res.status(201);
  res.send(createdProduct);
});

async function createProduct(productToSave) {
  const productsFile = await readProductJSONfile(); // reads JSON
  const products = productsFile.products;
  console.log(products);

  productToSave.id = generateProductId(products); //generates ID
  products.push(productToSave); // adds to array of products

  const fileContentToSave = JSON.stringify({ //stringifies to JSON saves to file 
    products: products
  }, null, 2);

  await writeFile(productsJsonPath, fileContentToSave);

  return productToSave;
}

function generateProductId(products) {
  let maxId = products[0]['id'];

  for (const product of products) {
    if (product['id'] > maxId) {
      maxId = product['id'];
    }
  }
  return maxId + 1;
}

app.delete('/api/products/:productId', async function (req, res) {

  const productId = parseInt(req.params.productId);
  console.log(productId);
  const deletedProduct = await deleteProductById(productId);
  console.log(deletedProduct);

  return res.json(deletedProduct);
});

async function deleteProductById(productId) {
  const productsFile = await readProductJSONfile(); //reads JSON
  const products = productsFile.products;

  const index = products.findIndex(p => p.id === productId);

  let deletedProduct = null;
  if (index !== -1) { // gives -1 if not found 
    deletedProduct = products[index];
    products.splice(index, 1);
  }

  const fileContentToSave = JSON.stringify({ //stringifies to JSON saves to file 
    products: products
  }, null, 2);
  await writeFile(productsJsonPath, fileContentToSave);

  return deletedProduct;
}

app.patch('/api/products/:productId', async function (req, res) {

  const productId = parseInt(req.params.productId);
  console.log(productId);
  const update = req.body;
  console.log(update);
  const updatedProduct = await updateProductById(productId, update);

  res.send(updatedProduct);
});

async function updateProductById(productId, update){
  const productFile = await readProductJSONfile(); //reads JSON
  const products = productFile.products;

  const index = products.findIndex(product => product.id === productId);

  if (index !== -1) {
    products[index] = { ...update, id: productId };
  }

  const fileContentToSave = JSON.stringify({ //stringifies to JSON saves to file 
    products: products
  }, null, 2);
  await writeFile(productsJsonPath, fileContentToSave);

  const updatedProfile = { ...products[index], id: productId };
  return updatedProfile;
}

// SHOPPING PROCESS
app.get('/api/products', async function (req, res) {
  const productsFile = await readProductJSONfile();
  const products = productsFile.products;

  return res.json(products);
});

const SHOPPINGCART = [];

app.post('/api/shopping/:productId', async function (req, res) {
  //getting product id in body, push to cart the number, res shoppingCart
  const clickedProductId = parseInt(req.params.productId);

  SHOPPINGCART.push(clickedProductId);
  console.log('shoppingcart', SHOPPINGCART);
  fillCart(SHOPPINGCART);

  res.status(201).json({
    success:true,
    message:'ok'
  });
});

// filtering from products.json, writing it to cart
async function fillCart(SHOPPINGCART) {
  const productsFile = await readProductJSONfile();
  const products = productsFile.products;

  const cartItems = [];

  for (const productId of SHOPPINGCART) {
    const product = products.find(p => p.id === productId);
    cartItems.push(product);
  }
  const fileContentToSave = JSON.stringify({ //stringifies to JSON saves to file 
    cart: cartItems
  }, null, 2);

  await writeFile(cartJsonPath, fileContentToSave);
}

app.get('/api/shopping', async function (req, res) {
  const shoppingFile = await readCartJSONfile();
  const shoppingCart = shoppingFile.cart;
  console.log('get shopping cart', shoppingCart);
  return res.json(shoppingCart);
});

//delete cart item
app.delete('/api/shopping/:productId', async function (req, res) {
  //getting product id in body, filter product from cart.json, delete it 
  const clickedProductId = parseInt(req.params.productId);

  const deletedProduct = await deleteShoppingItemById(clickedProductId);
  console.log(deletedProduct);

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
  console.log('reqBody', profile);

  const createdProfile = await createProfile(profile);
  console.log(createdProfile);

  return res.json(createdProfile);
});

async function createProfile(profileToSave) {
  const customerFile = await readCustomerJSONfile(); // reads JSON
  const customers = customerFile.customers;
  console.log(customers);

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
  return res.json(customer);
});


app.listen(8080, function () {

  console.log(`Server is running at: http://localhost:8080`);
});



