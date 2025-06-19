const express = require("express");
const router = express.Router();
const JobPostingSectionController = require("../controllers/JobPostingSectionController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.post(
  "/",
  authenticateAdmin,
  JobPostingSectionController.createJobPosting
);

router.get("/", JobPostingSectionController.getAllJobPostings);
router.get("/archive", JobPostingSectionController.getArchivedJobs);
router.get("/:id", JobPostingSectionController.getJobPostingById);

router.put(
  "/",
  authenticateAdmin,
  JobPostingSectionController.updateJobPosting
);

router.delete(
  "/",
  authenticateAdmin,
  JobPostingSectionController.deleteJobPosting
);
router.put(
  "/archive",
  authenticateAdmin,
  JobPostingSectionController.archiveJobPosting
);
module.exports = router;
