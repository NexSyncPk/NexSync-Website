const express = require("express");
const router = express.Router();
const teamRoutes = require("./team.route.js");
const jobPostingRoutes = require("./jobPosting.route.js");
const jobApplicationsRoutes = require("./jobApplications.route.js");

router.use("/team", teamRoutes);
router.use("/jobPosting", jobPostingRoutes);
router.use("/jobApplication", jobApplicationsRoutes);

module.exports = router;
