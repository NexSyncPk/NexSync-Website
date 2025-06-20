const express = require("express");
const router = express.Router();

const FindUsSectionController = require("../controllers/FindUsSectionController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.get("/", FindUsSectionController.getFindUsSection);
router.get("/address", FindUsSectionController.getFindUsSectionAddress);
router.get("/business-hours", FindUsSectionController.getFindUsSectionBusinessHours);

router.put("/", authenticateAdmin, FindUsSectionController.updateFindUsSection);
router.put("/address", authenticateAdmin, FindUsSectionController.updateFindUsSectionAddress);
router.put("/business-hours", authenticateAdmin, FindUsSectionController.updateFindUsSectionBusinessHours);

module.exports = router;
