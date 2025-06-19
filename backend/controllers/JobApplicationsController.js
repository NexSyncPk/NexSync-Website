const BaseController = require("./BaseController");
const {
  validateCreateJobApplication,
} = require("../validators/JobApplicationsValidator");

const JobApplicationsRepo = require("../repos/JobApplicationsRepo");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
// const db = require("sequelize");
const db = require("../models/index.js");
const JobApplications = db.JobApplications;
const JobPosting = db.JobPosting;
class JobApplicationsController extends BaseController {
  constructor() {
    super();
  }
  createJobApplication = async (req, res) => {
    if (!req.file) {
      return this.validationErrorResponse(res, "Resume is required");
    }
    const validationResult = validateCreateJobApplication(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }
    const resume = `/uploads/resumes/${req.file.filename}`;
    const applicationData = {
      ...req.body,
      resume,
    };

    const jobApplication = await JobApplicationsRepo.createJobApplication(
      applicationData
    );
    return this.successResponse(
      res,
      jobApplication,
      "Application submitted successfully! Thank you for applying. We will get back to you soon."
    );
  };

  getAllJobApplications = async (req, res) => {
    const {
      sortBy = "createdAt",
      sortOrder = "DESC",
      page = 1,
      limit = 10,
      search = "",
      lastEducation,
      expectedSalary,
      yearOfPassing,
    } = req.query;

    const offset = (page - 1) * limit;

    const searchCondition = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phoneNumber: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const filterConditions = {};
    if (lastEducation) filterConditions.lastEducation = lastEducation;
    if (expectedSalary) filterConditions.expectedSalary = expectedSalary;
    if (yearOfPassing) filterConditions.yearOfPassing = yearOfPassing;

    const where = {
      ...searchCondition,
      ...filterConditions,
    };

    const jobApplications = await JobApplicationsRepo.getAllJobApplications({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[sortBy, sortOrder.toUpperCase()]],
      include: [
        {
          model: db.JobPosting,
          as: "jobPosting",
          attributes: ["id", "title"],
        },
      ],
    });

    return this.successResponse(
      res,
      jobApplications,
      "Job Applications fetched"
    );
  };
  getJobApplicationById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in query");
    }

    const jobApplication = await JobApplicationsRepo.getJobApplicationById(id);
    if (!jobApplication) {
      return this.errorResponse(res, "Job Application not found", 400);
    }
    return this.successResponse(res, jobApplication, "Job Application fetched");
  };

  //admin can delete the job application posted by user
  deleteJobApplication = async (req, res) => {
    const { id, type } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in query");
    }
    if (type && type !== "soft" && type !== "hard") {
      return this.validationErrorResponse(
        res,
        "Invalid delete type. Use 'soft' or 'hard'"
      );
    }

    const jobApplication = await JobApplicationsRepo.getJobApplicationById(id);
    if (!jobApplication) {
      return this.errorResponse(res, "Job Application not found", 400);
    }

    await JobApplicationsRepo.deleteJobApplication(id, type || "soft");
    return this.successResponse(
      res,
      null,
      `Job Application deleted successfully`
    );
  };  // Download resume file
  downloadResume = async (req, res) => {
    try {
      const { filename } = req.params;

      // Security check: prevent directory traversal attacks
      if (
        filename.includes("..") ||
        filename.includes("/") ||
        filename.includes("\\")
      ) {
        return this.errorResponse(res, "Invalid filename", 400);
      }

      const filePath = path.join(__dirname, "../uploads/resumes", filename);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return this.errorResponse(res, "Resume file not found", 404);
      }

      // Get file extension to set proper Content-Type
      const fileExtension = path.extname(filename).toLowerCase();
      let contentType = "application/octet-stream"; // Default fallback
      
      switch (fileExtension) {
        case ".pdf":
          contentType = "application/pdf";
          break;
        case ".doc":
          contentType = "application/msword";
          break;
        case ".docx":
          contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;
        case ".txt":
          contentType = "text/plain";
          break;
        default:
          contentType = "application/octet-stream";
      }

      // Set proper headers for file download
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Pragma", "no-cache");

      // Send file
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          if (!res.headersSent) {
            return this.errorResponse(res, "Error downloading resume", 500);
          }
        }
      });
    } catch (error) {
      console.error("Error downloading resume:", error);
      return this.errorResponse(res, "Error downloading resume", 500);
    }
  };
}

module.exports = new JobApplicationsController();
