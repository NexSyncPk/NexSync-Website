const express = require("express");
const router = express.Router();
const teamRoutes = require("./team.route.js");
const jobPostingRoutes = require("./jobPosting.route.js");
const jobApplicationsRoutes = require("./jobApplications.route.js");
const adminAuthRoutes = require("./adminAuth.route.js");
const testimonialRoutes = require("./testimonials.route.js");

router.use("/adminAuth", adminAuthRoutes);
router.use("/team", teamRoutes);
router.use("/jobPosting", jobPostingRoutes);
router.use("/jobApplication", jobApplicationsRoutes);
router.use("/testimonial", testimonialRoutes);

module.exports = router;
