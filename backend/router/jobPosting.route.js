const express = require("express");
const router = express.Router();
const JobPostingController = require("../controllers/JobPostingController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.post("/", authenticateAdmin, JobPostingController.createJobPosting);

router.get("/", authenticateAdmin, JobPostingController.getAllJobPostings);

router.get("/:id", authenticateAdmin, JobPostingController.getJobPostingById);

router.put("/", authenticateAdmin, JobPostingController.updateJobPosting);

router.delete("/", authenticateAdmin, JobPostingController.deleteJobPosting);
module.exports = router;
