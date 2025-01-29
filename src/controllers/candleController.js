import Candle from "../models/candle.js";
import { uploadFileToCloudinary } from "../utils/cloudinaryConfig.js";
import ApiErrorResponse from "../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";

export const createCandle = asyncHandler(async (req, res, next) => {
  console.log("Request body:", req.body);
  console.log("Files received:", req.files);

  const { image } = req.files;

  if (!image) {
    return next(new ApiErrorResponse("Image file is required", 400));
  }

  try {
    // Upload the image to Cloudinary
    const uploadedImage = await uploadFileToCloudinary(image);
    console.log("Cloudinary upload result:", uploadedImage[0]);

    // Create the candle
    const candleInfo = await Candle.create({
      ...req.body,
      image: uploadedImage[0],
    });

    if (!candleInfo) {
      console.error("Candle creation failed.");
      return next(new ApiErrorResponse("Candle creation failed", 400));
    }

    return res.status(201).json({
      success: true,
      message: "Candle created successfully",
      data: candleInfo,
    });
  } catch (error) {
    // Add detailed error logging here
    console.error("Error during image upload or Candle creation:", error);
    return next(
      new ApiErrorResponse(
        `Image upload or candle creation failed: ${error.message}`,
        500
      )
    );
  }
});

export const getAllcandles = asyncHandler(async (req, res, next) => {
    try{
        
        const  candles= await Candle.find();
        return res.status(200).json({
            success:true,
            data:candles
        })
    }catch(error){
        console.error("Error during getting image:", error)
    }
    return next(
        new ApiErrorResponse(`Imag upload or candle creation failed:${error.message}`,500)
    )

});
