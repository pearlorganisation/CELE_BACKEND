import Obituary from "../models/obituaries.js";
import { uploadFileToCloudinary } from "../utils/cloudinaryConfig.js";
import ApiErrorResponse from "../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const getAllObituaries = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  // Use the pagination utility function
  const { data: obituaries, pagination } = await paginate(
    Obituary, // Model
    page, // Current page
    limit // Limit per page
    // [], // No population needed
    // {}, // No filters
    // "" // No fields to exclude or select
  );

  // Check if no obituaries are found
  if (!obituaries || obituaries.length === 0) {
    return next(new ApiErrorResponse("No Obituaries found", 404));
  }

  // Return the paginated response
  return res.status(200).json({
    success: true,
    message: "All obituaries found successfully",
    pagination, // Include pagination metadata
    data: obituaries,
  });
});

export const getObituary = asyncHandler(async (req, res, next) => {
  const obituary = await Obituary.findById(req.params.id).populate("photoGallery").populate("guestBooks");
  if (!obituary) {
    return next(new ApiErrorResponse("Obituary not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Obituary found successfully",
    data: obituary,
  });
});

export const deleteObituary = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const obituary = await Obituary.findByIdAndDelete(id);
  if (!obituary) {
    return next(new ApiErrorResponse("Obituary not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "Obituary deleted successfully",
  });
});

export const updateObituary = asyncHandler(async (req, res, next) => {});

// export const createObituary = asyncHandler(async (req, res, next) => {
//   const { banner, image } = req.files;

//   const uploadedImages = banner ? await uploadFileToCloudinary(banner) : [];

//   const subjectInfo = await Obituary.create({
//     ...req?.body,
//     banner: uploadedImages,
//   });
//   if (!subjectInfo) {
//     return next(new ApiErrorResponse("Subject creation failed", 400));
//   }
//   return res.status(201).json({
//     success: true,
//     message: "Subject created successfully",
//     data: subjectInfo,
//   });
// });

export const createObituary = asyncHandler(async (req, res, next) => {
  const { banner, image } = req.files;

  // Upload banner image to Cloudinary if it exists
  const uploadedBanner = banner ? await uploadFileToCloudinary(banner) : null;

  // Upload main image to Cloudinary if it exists
  const uploadedImage = image ? await uploadFileToCloudinary(image) : null;

  // Create obituary record with uploaded images
  const obituaryInfo = await Obituary.create({
    ...req.body,
    banner: uploadedBanner[0],
    image: uploadedImage[0],
  });

  // Handle creation failure
  if (!obituaryInfo) {
    return next(new ApiErrorResponse("Obituary creation failed", 400));
  }

  // Return successful response
  return res.status(201).json({
    success: true,
    message: "Obituary created successfully",
    data: obituaryInfo,
  });
});
