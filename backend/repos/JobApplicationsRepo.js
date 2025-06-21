const BaseRepo = require("./BaseRepo");
const db = require("../models/index.js");
class JobApplicationsRepo extends BaseRepo {
  model;
  constructor() {
    super(db.JobApplications);
    this.model = db.JobApplications;
  }

  async createJobApplication(data) {
    return await this.create(data);
  }  
  async getAllJobApplications() {
    const applications = await this.model.findAll({
      where: {
        isDeleted: false,
      },
      include: [
        {
          model: db.JobPostingSection,
          as: "jobPosting",
          attributes: ["id", "title", "position", "description", "jobType", "domain", "salary"],
        },
      ],
    });

    // Add download URL for resumes
    return applications.map(application => {
      const appData = application.toJSON();
      
      // Extract filename from resume path and create download URL
      if (appData.resume) {
        const filename = appData.resume.split('/').pop(); // Get filename from path
        // Provide both download API and direct static file access
        appData.resumeDownloadUrl = `/api/jobApplication/download/resume/${filename}`; // API route
        appData.resumeDirectUrl = `/uploads/resumes/${filename}`; // Direct static file access
      }
      
      return appData;
    });
  }

  async getJobApplicationById(id) {
    return await this.findOne({ id });
  }
  async deleteJobApplication(id, type) {
    await this.delete(id, type);
  
  }
  async getTotalJobApplications() {
    return await this.model.count({
      where: { isDeleted: false },
    });
  }
}


module.exports = new JobApplicationsRepo();
