import api from "../interceptor";

import {
    // Admin Auth endpoints
    adminLogin,
    adminLogout,
    adminResetPassword,
    adminVerifyToken,
    
    // Hero Section endpoints
    getHeroSection,
    updateHeroSection,
    createHeroSection,
    
    // Team Section endpoints
    getTeamSection,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getTeamMemberById,
    
    // Job Posting Section endpoints
    getJobPostings,
    createJobPosting,
    updateJobPosting,
    deleteJobPosting,
    getJobPostingById,
    archiveJobPosting,
    
    // Job Applications endpoints
    getJobApplications,
    createJobApplication,
    updateJobApplication,
    deleteJobApplication,
    getJobApplicationById,
    getJobApplicationsByPosting,
    
    // Testimonial Section endpoints
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    getTestimonialById,
    
    // Analytics endpoints
    getJobAnalytics,
    getTrafficAnalytics,
    getUserEngagementAnalytics,
    getBounceRateAnalytics,
    getClickThroughRateAnalytics,
    
    // Public endpoints
    getPublicJobs,
    getPublicTestimonials,
    getPublicTeam,
    getPublicHero,
    submitContactForm
} from "../endpoints";

import { type IObjectProps } from "../../types/index";

export const getTeamSectionData = async ()=>{
    try{
        const response = await api.get(getTeamSection)
        return response;
    }
    catch(error){
        console.error("Error fetching team section data:", error);
        return false;
    }
}

export const getTestimonialsData = async ()=>{
    try{
        const response = await api.get(getTestimonials)
        return response;
    }
    catch(error){
        console.error("Error fetching testimonials data:", error);
        return false;
    }
}

export const getHeroSectionData = async ()=>{
    try{
        const response = await api.get(getHeroSection)
        return response;
    }
    catch(error){
        console.error("Error fetching hero section data:", error);
        return false;
    }
}


