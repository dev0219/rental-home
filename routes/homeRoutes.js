const express = require("express");
const {
  getAllHomes,
  getGraphData,
  addNewHome,
  deleteHome,
} = require("../controllers/homeController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/").get(getAllHomes).post(protect, addNewHome);
router.route("/graph").get(getGraphData);
router
  .route("/:id")
  .delete(protect, deleteHome)

module.exports = router;
