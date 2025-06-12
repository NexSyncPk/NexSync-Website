const BaseController = require("./BaseController");
const {
  validateCreateJobApplication,
} = require("../validators/JobApplicationsValidator");

const JobApplicationsRepo = require("../repos/JobApplicationsRepo");

class JobApplicationsController extends BaseController {
  constructor() {
    super();
  }
  createJobApplication = async (req, res) => {
    const validationResult = validateCreateJobApplication(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }
    const jobApplication = await JobApplicationsRepo.createJobApplication(
      req.body
    );
    return this.successResponse(
      res,
      jobApplication,
      "Job Application successfully created"
    );
  };

  getAllJobApplications = async (req, res) => {
    const jobApplications = await JobApplicationsRepo.getAllJobApplications();
    return this.successResponse(
      res,
      jobApplications,
      "Job Applications successfully fetched"
    );
  };
  getJobApplicationById = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in query");
    }

    const jobApplication = await JobApplicationsRepo.getJobApplicationById(id);
    if (!jobApplication) {
      return this.errorResponse(res, "Job Application not found", 404);
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
      return this.errorResponse(res, "Job Application not found", 404);
    }

    await JobApplicationsRepo.deleteJobApplication(id, type || "soft");
    return this.successResponse(
      res,
      null,
      `Job Application ${
        type === "hard" ? "permanently" : "softly"
      } deleted successfully`
    );
  };
}
module.exports = new JobApplicationsController();
