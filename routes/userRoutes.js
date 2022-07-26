const express = require("express");
const {
  addNewUser,
  authUser,
  getUserProfile,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").post(addNewUser);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)

module.exports = router;
