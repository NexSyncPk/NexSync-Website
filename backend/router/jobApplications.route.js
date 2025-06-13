const express = require("express");
const router = express.Router();
const JobApplicationsController = require("../controllers/JobApplicationsController");
const { uploadResume } = require("../middlewares/upload.middleware");
router.post(
  "/",
  uploadResume.single("resume"),
  JobApplicationsController.createJobApplication
);

router.get("/", JobApplicationsController.getAllJobApplications);

router.get("/:id", JobApplicationsController.getJobApplicationById);

router.delete("/", JobApplicationsController.deleteJobApplication);

module.exports = router;
