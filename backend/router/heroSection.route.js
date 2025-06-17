const express = require("express");
const router = express.Router();

const HeroSectionController = require("../controllers/HeroSectionController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.get("/", HeroSectionController.getHeroSection);
router.put("/", authenticateAdmin, HeroSectionController.updateHeroSection);

module.exports = router;
