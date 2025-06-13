const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/TeamController");
const { uploadPicture } = require("../middlewares/upload.middleware");
const authenticateAdmin = require("../middlewares/auth.middleware");
router.post(
  "/",
  uploadPicture.single("picture"),
  authenticateAdmin,
  TeamController.createTeamMember
);
router.get("/", authenticateAdmin, TeamController.getAllTeamMembers);
router.get("/:id", authenticateAdmin, TeamController.getTeamMemberById);
router.put("/", authenticateAdmin, TeamController.updateTeamMember);
router.delete("/", authenticateAdmin, TeamController.deleteTeamMember);
module.exports = router;
