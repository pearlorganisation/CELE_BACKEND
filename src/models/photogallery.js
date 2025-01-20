import mongoose from "mongoose";

const photoGallerySchema = new mongoose.Schema(
  {
    images: [
      {
        asset_id: { type: String },
        secure_url: { type: String },
        public_id: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const PhotoGallery = mongoose.model("PhotoGallery", photoGallerySchema);

export default PhotoGallery;
