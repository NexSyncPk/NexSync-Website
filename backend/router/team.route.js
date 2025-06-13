const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/TeamController");
const { uploadPicture } = require("../middlewares/upload.middleware");
router.post(
  "/",
  uploadPicture.single("picture"),
  TeamController.createTeamMember
);
router.get("/", TeamController.getAllTeamMembers);
router.get("/:id", TeamController.getTeamMemberById);
router.put("/", TeamController.updateTeamMember);
router.delete("/", TeamController.deleteTeamMember);
module.exports = router;
