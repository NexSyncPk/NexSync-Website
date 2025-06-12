const express = require("express");
const router = express.Router();
const JobApplicationsController = require("../controllers/JobApplicationsController");

router.post("/", JobApplicationsController.createJobApplication);

router.get("/", JobApplicationsController.getAllJobApplications);

router.get("/single", JobApplicationsController.getJobApplicationById);

router.delete("/", JobApplicationsController.deleteJobApplication);

module.exports = router;
