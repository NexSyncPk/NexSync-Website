const express = require("express");
const router = express.Router();
const TestimonialsController = require("../controllers/TestimonalsController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.post("/", authenticateAdmin, TestimonialsController.createTestimonals);
router.get("/", authenticateAdmin, TestimonialsController.getAllTestimonials);
router.get(
  "/:id",
  authenticateAdmin,
  TestimonialsController.getTestimonialById
);
router.put("/", authenticateAdmin, TestimonialsController.updateTestimonial);
router.delete("/", authenticateAdmin, TestimonialsController.deleteTestimonial);
module.exports = router;
