import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    cartId: { type: String, required: true, unique: true }, // Unique cart ID
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
