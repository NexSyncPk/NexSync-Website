const express = require("express");
const router = express.Router();
const TeamSectionController = require("../controllers/TeamSectionController");
const { uploadPicture } = require("../middlewares/upload.middleware");
const authenticateAdmin = require("../middlewares/auth.middleware");

// Create team member (with file upload) - temporarily remove auth for testing
router.post(
  "/",
  uploadPicture.single("picture"),
  // authenticateAdmin,
  TeamSectionController.createTeamMember
);

// Get all team members
router.get("/", TeamSectionController.getAllTeamMembers);

// Get team member by ID  
router.get("/get", TeamSectionController.getTeamMemberById);

// Update team member (with optional file upload) - temporarily remove auth for testing
router.put("/update", 
  uploadPicture.single("picture"),
  // authenticateAdmin, 
  TeamSectionController.updateTeamMember
);

// Delete team member - temporarily remove auth for testing
router.delete("/delete", 
  // authenticateAdmin, 
  TeamSectionController.deleteTeamMember
);

module.exports = router;
