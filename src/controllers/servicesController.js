import Obituary from "../models/obituaries.js";
import Service from "../models/services.js";
import { uploadFileToCloudinary } from "../utils/cloudinaryConfig.js";
import ApiErrorResponse from "../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const getAllServices = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  // Use the pagination utility function
  const { data: services, pagination } = await paginate(
    Service, // Model
    page, // Current page
    limit,
    [
      // Limit per page
      {
        path: "services",
        select: "name bannerService -_id",
      },
    ] // No population needed
    // {}, // No filters
    // "" // No fields to exclude or select
  );

  // Check if no obituaries are found
  if (!services || services.length === 0) {
    return next(new ApiErrorResponse("No services found", 404));
  }

  // Return the paginated response
  return res.status(200).json({
    success: true,
    message: "All services found successfully",
    pagination, // Include pagination metadata
    data: services,
  });
});

export const getServiceById = asyncHandler(async (req, res, next) => {
  const service = await Service.findById(req.params.id).populate("services");

  console.log(service, "my service");
  if (!service) {
    return next(new ApiErrorResponse("service not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "service found successfully",
    data: service,
  });
});

export const deleteService = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    return next(new ApiErrorResponse("service not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "service deleted successfully",
  });
});

export const updateService = asyncHandler(async (req, res, next) => {});

export const createService = asyncHandler(async (req, res, next) => {
  const { banner } = req.files;

  const uploadedBanner = banner ? await uploadFileToCloudinary(banner) : null;

  const serviceInfo = await Service.create({
    ...req.body,
    banner: uploadedBanner[0],
  });

  if (!serviceInfo) {
    return next(new ApiErrorResponse("Service creation failed", 400));
  }

  return res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: serviceInfo,
  });
});
