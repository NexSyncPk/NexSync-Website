const express = require("express");
const router = express.Router();
const JobPostingController = require("../controllers/JobPostingController");

router.post("/", JobPostingController.createJobPosting);

router.get("/", JobPostingController.getAllJobPostings);

router.get("/:id", JobPostingController.getJobPostingById);

router.put("/", JobPostingController.updateJobPosting);

router.delete("/", JobPostingController.deleteJobPosting);
module.exports = router;
