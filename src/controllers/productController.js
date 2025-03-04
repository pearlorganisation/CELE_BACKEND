import Product from "../models/product.js";
import { uploadFileToCloudinary } from "../utils/cloudinaryConfig.js";

import { asyncHandler } from "../utils/errors/asyncHandler.js";

// CreateProduct Route
export const CreateProduct = asyncHandler(async (req, res, next) => {
  const { images } = req.files; // Destructure images from req.files
  console.log(images,"images")

 

  try {
    const uploadedImages = images
    ? await Promise.all(images.map((file) => uploadFileToCloudinary(file)))
    : [];
   
    console.log(uploadedImages); 

    const selectedBanners = uploadedImages?.map((uploadedImage) => uploadedImage[0]);

    const product = await Product.create({
      ...req.body,
      images: selectedBanners, // Pass the array of image URLs
    });

    return res.status(201).json({
      success: true,
      message:"Products created successfully",
   
      data: product,
    });

  } catch (error) {
    next(error);
  }
});



export const getProductData = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find();

    // Correct usage of res.status to set the status code
    return res.status(200).json({
      success: true,
      message:"Products found successfully",
      data:products,
    });

    
  } catch (error) {
    next(error); // Pass the error to error handling middleware
  }
});

