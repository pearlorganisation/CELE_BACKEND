import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    banner: {
      asset_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    serviceDescription: { type: String, required: true },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubService",
      },
    ],
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", servicesSchema);

export default Service;
