const express = require("express");
const router = express.Router();
const TestimonialSectionController = require("../controllers/TestimonialSectionController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.post(
  "/",
  authenticateAdmin,
  TestimonialSectionController.createTestimonials
);
router.get("/", TestimonialSectionController.getAllTestimonials);
router.get("/:id", TestimonialSectionController.getTestimonialById);
router.put(
  "/",
  authenticateAdmin,
  TestimonialSectionController.updateTestimonial
);
router.delete(
  "/",
  authenticateAdmin,
  TestimonialSectionController.deleteTestimonial
);

module.exports = router;
