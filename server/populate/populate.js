import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Product from "../db/product.model.js";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

async function populateProducts() {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const data = fs.readFileSync(path.resolve(__dirname, "products.json"), "utf8");
    const products = JSON.parse(data);

    await Product.insertMany(products);
    console.log(`${products.length} products added to MongoDB`);
  } catch (err) {
    console.error("Error reading or inserting product data:", err);
  }
}

async function main() {
  await mongoose.connect(mongoUrl);

  await populateProducts();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
