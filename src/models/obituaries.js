import mongoose from "mongoose";

const obituarySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: {
      asset_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    banner: {
      asset_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now }, 
    birthYear: { type: Date, required: true },
    deathYear: { type: Date, required: true },
    location: { type: String, required: true },
    socialLinks: { type: Array, required: true },
    photoGallery: { type: mongoose.Types.ObjectId, ref:"PhotoGallery"},
    guestBooks: { type: mongoose.Types.ObjectId, ref:"GuestBook"}
  },
  { timestamps: true }
);

const Obituary = mongoose.model("Obituary", obituarySchema);

export default Obituary;
