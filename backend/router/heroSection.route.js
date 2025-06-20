const express = require("express");
const router = express.Router();

const HeroSectionController = require("../controllers/HeroSectionController");
const authenticateAdmin = require("../middlewares/auth.middleware");
const { uploadHeroImage } = require("../middlewares/upload.middleware");

router.get("/", HeroSectionController.getHeroSection);
router.put(
  "/", 
  authenticateAdmin, 
  uploadHeroImage.single("heroImage"), 
  HeroSectionController.updateHeroSection
);

module.exports = router;
