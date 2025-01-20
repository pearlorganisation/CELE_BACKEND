import GuestBook from "../models/guestbook.js";
import PhotoGallery from "../models/photogallery.js";
import { uploadFileToCloudinary } from "../utils/cloudinaryConfig.js";
import ApiErrorResponse from "../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const getAllPhotoGalleries = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  // Use the pagination utility function
  const { data: photoGalleries, pagination } = await paginate(
    PhotoGallery, // Model
    page, // Current page
    limit // Limit per page
    // [], // No population needed
    // {}, // No filters
    // "" // No fields to exclude or select
  );

  // Check if no obituaries are found
  if (!photoGalleries || photoGalleries.length === 0) {
    return next(new ApiErrorResponse("No photoGalleries found", 404));
  }

  // Return the paginated response
  return res.status(200).json({
    success: true,
    message: "All photos found successfully",
    pagination, // Include pagination metadata
    data: photoGalleries,
  });
});

export const getPhotoGallery = asyncHandler(async (req, res, next) => {
  const photoGallery = await PhotoGallery.findById(req.params.id);
  if (!photoGallery) {
    return next(new ApiErrorResponse("photoGallery not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "photoGallery found successfully",
    data: photoGallery,
  });
});

export const updatePhotoGallery = asyncHandler(async (req, res, next) => {});

export const deletePhotoGallery = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const photoGallery = await PhotoGallery.findByIdAndDelete(id);
  if (!photoGallery) {
    return next(new ApiErrorResponse("photoGallery not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "photoGallery deleted successfully",
  });
});

export const createPhotoGallery = asyncHandler(async (req, res, next) => {
  const { images } = req.files;

  // Upload banner image to Cloudinary if it exists
  const uploadedImages = images
    ? await Promise.all(images.map((file) => uploadFileToCloudinary(file)))
    : [];

  const selectedBanners = uploadedImages
    .slice(0, 5)
    .map((uploadedImage) => uploadedImage[0]);

  console.log(selectedBanners, "selected banners");

  // Create obituary record with uploaded images
  const photoGalleryInfo = await PhotoGallery.create({
    ...req.body,
    images: selectedBanners,
  });

  // Handle creation failure
  if (!photoGalleryInfo) {
    return next(new ApiErrorResponse("Photo Gallery creation failed", 400));
  }

  // Return successful response
  return res.status(201).json({
    success: true,
    message: "Photo Gallery created successfully",
    data: photoGalleryInfo,
  });
});
