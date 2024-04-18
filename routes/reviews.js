const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
const { validationReview, isLoggIn, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/reviews");

router.post("/", isLoggIn, validationReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
