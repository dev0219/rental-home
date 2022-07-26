const express = require("express");
const {
  addToCart,
  removeFromCart,
} = require("../controllers/cartController.js");
const { protect, admin } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").post(protect, addToCart);
router.route("/:id").delete(protect, removeFromCart)

module.exports = router;
