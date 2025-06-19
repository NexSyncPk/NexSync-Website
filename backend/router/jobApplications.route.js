const express = require("express");
const router = express.Router();
const JobApplicationsController = require("../controllers/JobApplicationsController");
const { uploadResume } = require("../middlewares/upload.middleware");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.post(
  "/",
  uploadResume.single("resume"),
  JobApplicationsController.createJobApplication
);

router.get("/", JobApplicationsController.getAllJobApplications);

// Add route for downloading resume files - must come before /:id route
router.get("/download/resume/:filename", JobApplicationsController.downloadResume);

router.get("/:id", JobApplicationsController.getJobApplicationById);

router.delete(
  "/",
  authenticateAdmin,
  JobApplicationsController.deleteJobApplication
);

module.exports = router;
