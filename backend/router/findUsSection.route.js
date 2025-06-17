const express = require("express");
const router = express.Router();

const FindUsSectionController = require("../controllers/FindUsSectionController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.get("/", FindUsSectionController.getFindUsSection);
router.put("/", authenticateAdmin, FindUsSectionController.updateFindUsSection);
module.exports = router;
