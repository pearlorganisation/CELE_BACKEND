import mongoose from "mongoose";

const guestbookSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    images: [
      {
        asset_id: { type: String },
        secure_url: { type: String },
        public_id: { type: String },
      },
    ],
    message: { type: String },
    email: { type: String },
    candle: {
      type: String,
    },
  },
  { timestamps: true }
);

const GuestBook = mongoose.model("GuestBook", guestbookSchema);

export default GuestBook;
