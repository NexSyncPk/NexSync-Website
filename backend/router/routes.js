const express = require("express");
const router = express.Router();
const teamSectionRoutes = require("./teamSection.route.js");
const jobPostingRoutes = require("./jobPosting.route.js");
const jobApplicationsRoutes = require("./jobApplications.route.js");
const adminAuthRoutes = require("./adminAuth.route.js");
const testimonialRoutes = require("./testimonials.route.js");
const heroSectionRoutes = require("./heroSection.route.js");

router.use("/adminAuth", adminAuthRoutes);
router.use("/teamSection", teamSectionRoutes);
router.use("/jobPosting", jobPostingRoutes);
router.use("/jobApplication", jobApplicationsRoutes);
router.use("/testimonial", testimonialRoutes);
router.use("/heroSection", heroSectionRoutes);

module.exports = router;
