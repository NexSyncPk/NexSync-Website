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
    getPublicTestimonials,    getPublicTeam,
    getPublicHero,
    submitContactForm,
    getFindUsData,
    getFindUsAddress,
    getFindUsBusinessHours,
    updateFindUsAddress,
    updateFindUsBusinessHours,
    getJobApplicationsCount,
    getJobPostingsCount
} from "../endpoints";

import { type IObjectProps, type JobApplication } from "../../types/index";
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

export const deleteJobApp = async (id:string, type: "soft" | "hard" = "soft")=>{
    try{
        const response =  await api.delete(`${deleteJobApplication}/?id=${id}&type=${type}`);
        return response;
    }catch(error){
        console.log("Error in deleting job application", error)
        throw error;
    }
}

export const handleResumeDownload = (application: JobApplication) => {
    const baseUrl = "http://localhost:3000";
    const downloadUrl =
      application.resumeDirectUrl || application.resumeDownloadUrl;

    if (!downloadUrl) {
      alert("Resume not available for download");
      return;
    }

    const fileExtension = application.resume.split(".").pop() || "pdf";
    const cleanName = application.name
      .replace(/[^a-zA-Z0-9\s]/g, "_")
      .replace(/\s+/g, "_");
    const downloadFilename = `${cleanName}_resume.${fileExtension}`;

    const link = document.createElement("a");
    link.href = `${baseUrl}${downloadUrl}`;
    link.download = downloadFilename;
    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  export const updateHeroSectionDetails = async (data: FormData | IObjectProps, id?: number) => {
    try {
        // If data is FormData, use id parameter for URL, otherwise extract from data object
        const heroId = id || (data as IObjectProps)?.id;
        const response = await api.put(`${updateHeroSection}?id=${heroId}`, data);
        return response;
    } catch (error) {
        console.error("Error updating hero section:", error);
        return false;
    }
}


export const addTestimonial = async (data: IObjectProps)=>{
    try{
        const response = await api.post(createTestimonial, data)
    return response
    }
    catch(error){
        console.error("Error in Creating Testimonial")
        return false
    }
}

export const updateTestimonialDetails = async(data: FormData | IObjectProps, id?: number)=>{
    try {
        // If data is FormData, use id parameter for URL, otherwise extract from data object
        const testId = id || (data as IObjectProps)?.id;
        const response = await api.put(`${updateTestimonial}?id=${testId}`, data);
        return response;
    } catch (error) {
        console.error("Error updating testimonials:", error);
        return false;
    }
}

export const deleteTestimonialDetails = async(id?:number, type: "soft" | "hard" = "soft" )=>{
    console.log("Deleting testimonial with ID:", id, "and type:", type);
    try{
        const response =  await api.delete(`${deleteTestimonial}/?id=${id}&type=${type}`);
        return response;
    }catch(error){
        console.log("Error in deleting job application", error)
        throw error;
    }
}

export const getFindUsSectionAddress= async ()=>{
    try {
        const response = await api.get(getFindUsAddress);
        return response;
    } catch (error) {
        console.error("Error fetching find us section data:", error);
        return false;
    }
}
export const getFindUsSectionBusinessHours = async ()=>{
    try {
        const response = await api.get(getFindUsBusinessHours);
        return response;
    } catch (error) {
        console.error("Error fetching find us section data:", error);
        return false;
    }
}
export const updateFindUsSectionAddress = async (data: any, id: string | number) => {
    try {
        const response = await api.put(`${updateFindUsAddress}?id=${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating find us section address:", error);
        return false;
    }
}

export const updateFindUsSectionBusinessHours = async (data: any, id: string | number) => {
    try {
        const response = await api.put(`${updateFindUsBusinessHours}?id=${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating find us section business hours:", error);
        return false;
    }
}

export const createTeamsMember = async (data: IObjectProps) => {
    try {
        const response = await api.post(createTeamMember, data);
        return response;
    } catch (error) {
        console.error("Error creating team member:", error);
        return false;
    }
}

export const updateTeamMemberDetails = async (id: number, data: FormData | IObjectProps) => {
    try {
        const response = await api.put(`${updateTeamMember}?id=${id}`, data);
        return response;
    } catch (error) {
        console.error("Error updating team member:", error);
        return false;
    }
}

export const deleteTeamMemberDetails = async (id: number, type: "soft" | "hard" = "soft") => {
    try {
        const response = await api.delete(`${deleteTeamMember}/?id=${id}&type=${type}`);
        return response;
    } catch (error) {
        console.error("Error deleting team member:", error);
        throw error;
    }
}

export const getAllJobApplicationsCount= async ()=>{
    try {
        const response = await api.get(getJobApplicationsCount);
        return response;
    } catch (error) {
        console.error("Error fetching job applications count:", error);
        return false;
    }
} 

export const getTotalActiveJobsCount =async ()=>{
    try {
        const response = await api.get(getJobPostingsCount);
        return response;
    } catch (error) {
        console.error("Error fetching total active jobs count:", error);
        return false;
    }
}