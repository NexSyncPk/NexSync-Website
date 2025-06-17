const express = require("express");
const router = express.Router();
const TeamSectionController = require("../controllers/TeamSectionController");
const { uploadPicture } = require("../middlewares/upload.middleware");
const authenticateAdmin = require("../middlewares/auth.middleware");
router.post(
  "/",
  uploadPicture.single("picture"),
  authenticateAdmin,
  TeamSectionController.createTeamMember
);
router.get("/", TeamSectionController.getAllTeamMembers);
router.get("/:id", TeamSectionController.getTeamMemberById);
router.put("/", authenticateAdmin, TeamSectionController.updateTeamMember);
router.delete("/", authenticateAdmin, TeamSectionController.deleteTeamMember);
module.exports = router;
