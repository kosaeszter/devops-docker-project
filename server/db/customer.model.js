import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  shippingCountry: { type: String, required: true },
  shippingZipCode: { type: String, required: true },
  shippingCity: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  invoiceCountry: { type: String, required: true },
  invoiceZipCode: { type: String, required: true },
  invoiceCity: { type: String, required: true },
  invoiceAddress: { type: String, required: true }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;