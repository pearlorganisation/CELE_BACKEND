import SubService from "../models/subServices.js";
import { uploadFileToCloudinary } from "../utils/cloudinaryConfig.js";
import ApiErrorResponse from "../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const getAllSubServices = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  // Use the pagination utility function
  const { data: subServices, pagination } = await paginate(
    SubService, // Model
    page, // Current page
    limit // Limit per page
    // [], // No population needed
    // {}, // No filters
    // "" // No fields to exclude or select
  );

  // Check if no obituaries are found
  if (!subServices || subServices.length === 0) {
    return next(new ApiErrorResponse("No sub services found", 404));
  }

  // Return the paginated response
  return res.status(200).json({
    success: true,
    message: "All sub services found successfully",
    pagination, // Include pagination metadata
    data: subServices,
  });
});

export const getSubServiceById = asyncHandler(async (req, res, next) => {
  const subservice = await SubService.findById(req.params.id);
  if (!subservice) {
    return next(new ApiErrorResponse("subservice not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "subservice found successfully",
    data: subservice,
  });
});

export const deleteSubService = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subservice = await SubService.findByIdAndDelete(id);
  if (!subservice) {
    return next(new ApiErrorResponse("subservice not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "subservice deleted successfully",
  });
});

export const updateSubService = asyncHandler(async (req, res, next) => {});

export const createSubService = asyncHandler(async (req, res, next) => {
  const { bannerService, imageService } = req.files;

  const uploadedBanner = bannerService
    ? await uploadFileToCloudinary(bannerService)
    : null;

  const uploadedImage = imageService
    ? await uploadFileToCloudinary(imageService)
    : null;

  const subserviceInfo = await SubService.create({
    ...req.body,
    bannerService: uploadedBanner[0],
    imageService: uploadedImage[0],
  });

  if (!subserviceInfo) {
    return next(new ApiErrorResponse("subService creation failed", 400));
  }

  return res.status(201).json({
    success: true,
    message: "Sub Service created successfully",
    data: subserviceInfo,
  });
});
