/**
 * ---------------------------------------------------------------
 *
 *  This file is to be used for defining the api endpoints only...
 *
 * ---------------------------------------------------------------
 */

// Admin Auth endpoints (matches backend /adminAuth routes)
export const adminLogin = "adminAuth/";
export const adminLogout = "adminAuth/logout"; 
export const adminResetPassword = "adminAuth/reset-password";
export const adminVerifyToken = "adminAuth/verify-token";

// Hero Section endpoints (matches backend /heroSection routes)
export const getHeroSection = "heroSection/";
export const updateHeroSection = "heroSection/";
export const createHeroSection = "heroSection/create";

// Team Section endpoints (matches backend /teamSection routes)
export const getTeamSection = "teamSection/";
export const createTeamMember = "teamSection/";
export const updateTeamMember = "teamSection/update";
export const deleteTeamMember = "teamSection/delete";
export const getTeamMemberById = "teamSection/get";

// Findus endpoints (matches backend /teamSection routes)
export const getFindUsData = "findUsSection/";
export const getFindUsAddress = "findUsSection/address";
export const getFindUsBusinessHours = "findUsSection/business-hours";
export const updateFindUsAddress = "findUsSection/address";
export const updateFindUsBusinessHours = "findUsSection/business-hours";
export const createFindUsData = "findUsSection/create";
export const updateFindUsData = "findUsSection/update";

// Job Posting Section endpoints (matches backend /jobPosting routes)
export const getJobPostings = "jobPosting/";
export const createJobPosting = "jobPosting/";
export const updateJobPosting = "jobPosting/"; // Will use PUT with ID in URL
export const deleteJobPosting = "jobPosting/"; // Will use DELETE with ID in URL
export const getJobPostingById = "jobPosting/"; // Will append ID
export const archiveJobPosting = "jobPosting/archive";
export const getJobPostingsCount = "jobPosting/count";

// Job Applications endpoints (matches backend /jobApplication routes)
export const getJobApplications = "jobApplication/";
export const createJobApplication = "jobApplication/";
export const updateJobApplication = "jobApplication/update";
export const deleteJobApplication = "jobApplication/";
export const getJobApplicationById = "jobApplication/get";
export const getJobApplicationsByPosting = "jobApplication/by-posting";
export const getJobApplicationsCount = "jobApplication/count";

// Testimonial Section endpoints (matches backend /testimonialSection routes)
export const getTestimonials = "testimonialSection/";
export const createTestimonial = "testimonialSection/";
export const updateTestimonial = "testimonialSection/";
export const deleteTestimonial = "testimonialSection/";
export const getTestimonialById = "testimonialSection/get";

// Analytics endpoints (for admin dashboard)
export const getJobAnalytics = "analytics/jobs";
export const getTrafficAnalytics = "analytics/traffic";
export const getUserEngagementAnalytics = "analytics/user-engagement";
export const getBounceRateAnalytics = "analytics/bounce-rate";
export const getClickThroughRateAnalytics = "analytics/click-through-rate";

// Public endpoints for main website
export const getPublicJobs = "public/jobs";
export const getPublicTestimonials = "public/testimonials";
export const getPublicTeam = "public/team";
export const getPublicHero = "public/hero";
export const submitContactForm = "public/contact";
