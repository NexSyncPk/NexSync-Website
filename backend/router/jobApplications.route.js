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

router.get(
  "/",
  authenticateAdmin,
  JobApplicationsController.getAllJobApplications
);

router.get(
  "/:id",
  authenticateAdmin,
  JobApplicationsController.getJobApplicationById
);

router.delete(
  "/",
  authenticateAdmin,
  JobApplicationsController.deleteJobApplication
);

module.exports = router;
