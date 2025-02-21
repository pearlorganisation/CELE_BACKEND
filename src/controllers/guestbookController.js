import GuestBook from "../models/guestbook.js";
import { uploadFileToCloudinary } from "../utils/cloudinaryConfig.js";
import ApiErrorResponse from "../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const getAllGuestBooks = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  // Use the pagination utility function
  const { data: guestbooks, pagination } = await paginate(
    GuestBook, // Model
    page, // Current page
    limit // Limit per page

  );

  // Check if no obituaries are found
  if (!guestbooks || guestbooks.length === 0) {
    return next(new ApiErrorResponse("No guestbooks found", 404));
  }

  // Return the paginated response
  return res.status(200).json({
    success: true,
    message: "All guestbooks found successfully",
    pagination, // Include pagination metadata
    data: guestbooks,
  });
});

export const getGuestBook = asyncHandler(async (req, res, next) => {
  const guestBook = await GuestBook.findById(req.params.id);
  if (!guestBook) {
    return next(new ApiErrorResponse("guestBook not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "guestBook found successfully",
    data: guestBook,
  });
});

export const updateGuestBook = asyncHandler(async (req, res, next) => {});

export const deleteGuestBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const guestBook = await GuestBook.findByIdAndDelete(id);
  if (!guestBook) {
    return next(new ApiErrorResponse("guestBook not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "guestBook deleted successfully",
  });
});

export const createGuestBook = asyncHandler(async (req, res, next) => {
  const { images } = req.files;

  // Upload banner image to Cloudinary if it exists
  const uploadedImages = images
    ? await Promise.all(images.map((file) => uploadFileToCloudinary(file)))
    : [];

  const selectedBanners = uploadedImages
    .slice(0, 4)
    .map((uploadedImage) => uploadedImage[0]);

  console.log(selectedBanners, "selected banners");

  // Create obituary record with uploaded images
  const guestBookInfo = await GuestBook.create({
    ...req.body,
    images: selectedBanners,
  });

  // Handle creation failure
  if (!guestBookInfo) {
    return next(new ApiErrorResponse("GuestBook creation failed", 400));
  }

  // Return successful response
  return res.status(201).json({
    success: true,
    message: "Guest Book created successfully",
    data: guestBookInfo,
  });
});




