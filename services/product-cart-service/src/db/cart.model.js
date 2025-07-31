import mongoose from "mongoose";
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  count: {
    type: Number,
    required: true,
    min: 1
  }
});

const cartSchema = new Schema({
  items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;




