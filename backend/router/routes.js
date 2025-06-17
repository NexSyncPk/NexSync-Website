const express = require("express");
const router = express.Router();
const teamSectionRoutes = require("./teamSection.route.js");
const jobPostingSectionRoutes = require("./jobPostingSection.route.js");
const jobApplicationsRoutes = require("./jobApplications.route.js");
const adminAuthRoutes = require("./adminAuth.route.js");
const testimonialSectionRoutes = require("./testimonialSection.route.js");
const heroSectionRoutes = require("./heroSection.route.js");
const findUsSectionRoutes = require("./findUsSection.route.js");

router.use("/adminAuth", adminAuthRoutes);
router.use("/teamSection", teamSectionRoutes);
router.use("/jobPosting", jobPostingSectionRoutes);
router.use("/jobApplication", jobApplicationsRoutes);
router.use("/testimonialSection", testimonialSectionRoutes);
router.use("/heroSection", heroSectionRoutes);
router.use("/findUsSection", findUsSectionRoutes);

module.exports = router;
