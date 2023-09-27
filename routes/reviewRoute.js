const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewsContoller");
const { getsingleUser } = require("../controllers/userController");

const {
  authenticateUser,
 
} = require("../middleware/authentication");

router.route("/").get(getAllReviews).post([authenticateUser], createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .patch([authenticateUser], updateReview)
  .delete([authenticateUser], deleteReview);

module.exports = router;
