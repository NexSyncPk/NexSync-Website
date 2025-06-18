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
    submitContactForm,
    getFindUsData
} from "../endpoints";

import { type IObjectProps } from "../../types/index";
import { ca } from "zod/v4/locales";

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

export const getFindUs = async ()=>{
    try{
        const response = await api.get(getFindUsData)
        return response;
    }
    catch(error){
        console.error("Error fetching find us data:", error);
        return false;
    }
}

export const getJobs =async () =>{
    try{
        const response = await api.get(getJobPostings);
        return response;
    }
    catch (error) {
        console.error("Error fetching job postings:", error);
        return false;
    }
}


export const applyForJob = async (data: IObjectProps) => {
    try {
        const response = await api.post(createJobApplication, data);
        return response;
    } catch (error) {
        console.error("Error applying for job:", error);
        return false;
    }
}