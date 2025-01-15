import Review from "../models/reviews.js";
import ApiErrorResponse from "../utils/errors/ApiErrorResponse.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { paginate } from "../utils/pagination.js";

export const getAllReviews = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  // Use the pagination utility function
  const { data: reviews, pagination } = await paginate(
    Review, // Model
    page, // Current page
    limit // Limit per page
    // [], // No population needed
    // {}, // No filters
    // "" // No fields to exclude or select
  );

  // Check if no obituaries are found
  if (!reviews || reviews.length === 0) {
    return next(new ApiErrorResponse("No Reviews found", 404));
  }

  // Return the paginated response
  return res.status(200).json({
    success: true,
    message: "All Reviews found successfully",
    pagination, // Include pagination metadata
    data: reviews,
  });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const reviewInfo = await Review.create(req.body);
  if (!reviewInfo) {
    return next(new ApiErrorResponse("Review submission failed", 400));
  }
  return res.status(201).json({
    success: true,
    message: "Review submitted successfully",
    data: reviewInfo,
  });
});

export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(new ApiErrorResponse("review not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "review found successfully",
    data: review,
  });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findByIdAndDelete(id);
  if (!review) {
    return next(new ApiErrorResponse("review not found", 404));
  }
  return res.status(200).json({
    success: true,
    message: "review deleted successfully",
  });
});

export const updateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validations are run on the updated data
  });

  if (!updatedReview) {
    return next(new ApiErrorResponse("Review not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Review updated successfully",
    data: updatedReview,
  });
});
