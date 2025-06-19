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

export const createJob = async (data: IObjectProps) => {
    try {
        const response = await api.post(createJobPosting, data);
        return response;
    } catch (error) {
        console.error("Error creating job posting:", error);
        return false;
    }
}
export const getArchivedJobs = async () => {
    try {
        const response = await api.get(archiveJobPosting);
        return response;
    } catch (error) {
        console.error("Error fetching archived job postings:", error);
        return false;
    }
}

export const deleteJobById = async (id: string, type: 'soft' | 'hard' = 'soft') => {
    try {
        const response = await api.delete(`${deleteJobPosting}/?id=${id}&&type=${type}`);
        return response;
    } catch (error) {
        console.error("Error deleting job posting:", error);
        throw error; // Re-throw error for proper handling
    }
}

export const toggleJobArchive = async (id: string) => {
    try {
        const response = await api.put(`${archiveJobPosting}/?id=${id}`);
        return response;
    } catch (error) {
        console.error("Error toggling job archive status:", error);
        throw error; // Re-throw error for proper handling
    }
}

export const getAllJobApplications = async ()=>{
    try {
        const response = await api.get(getJobApplications);
        return response;
    } catch (error) {
        console.error("Error fetching job applications:", error);
        return false;
    }
} 

// Download resume file
export const downloadResume = async (filename: string, applicantName: string) => {
    try {
        const response = await api.get(`/jobApplication/download/resume/${filename}`, {
            responseType: 'blob', // Important for file downloads
        });
        
        // Create blob URL
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `${applicantName}_resume.pdf`;
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        return true;
    } catch (error) {
        console.error("Error downloading resume:", error);
        throw error;
    }
};

export const deleteJobAppliation = async (id:string, type: "soft" | "hard" = "soft")=>{
    try{
        const response =  await api.delete(`${deleteJobApplication}/?id=${id}&&type=${type}`);
        return response;
    }catch(error){
        console.log("Error in deleting job application", error)
        throw error;
    }
}