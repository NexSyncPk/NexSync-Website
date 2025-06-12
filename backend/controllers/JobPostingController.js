const JobPostingRepo = require("../repos/JobPostingRepo");
const JobPostingValidator = require("../validators/JobPostingValidator");
const {
  validateCreateJobPosting,
  validateUpdateJobPosting,
} = require("../validators/JobPostingValidator");
const BaseController = require("./BaseController");
class JobPostingController extends BaseController {
  constructor() {
    super();
  }

  createJobPosting = async (req, res) => {
    const validationResult = validateCreateJobPosting(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }
    const jobPosting = await JobPostingRepo.createJobPosting(req.body);
    return this.successResponse(
      res,
      jobPosting,
      "Job Posting successfully created"
    );
  };

  getAllJobPostings = async (req, res) => {
    const jobPostings = await JobPostingRepo.getAllJobPostings();
    return this.successResponse(
      res,
      jobPostings,
      "Job Postings successfully fetched"
    );
  };
  getJobPostingById = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in query");
    }
    const jobPosting = await JobPostingRepo.getJobPostingById(id);
    if (!jobPosting) {
      return this.errorResponse(res, "Job Posting not found", 404);
    }

    return this.successResponse(res, jobPosting, "Job posting fetched");
  };

  updateJobPosting = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required");
    }
    const validationResult = validateUpdateJobPosting(req.body, id);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const updatedJobPosting = await JobPostingRepo.updateJobPosting(
      req.body,
      id
    );
    return this.successResponse(
      res,
      updatedJobPosting,
      "Job Posting has been updated"
    );
  };

  deleteJobPosting = async (req, res) => {
    const { id, type } = req.query;
    if (!id) {
      return this.errorResponse(res, "id is required", 404);
    }
    if (type && type !== "soft" && type !== "hard") {
      return this.validationErrorResponse(
        res,
        "Invalid delete type. Use 'soft' or 'hard'"
      );
    }

    const jobPosting = await JobPostingRepo.getJobPostingById(id);
    if (!jobPosting) {
      return this.errorResponse(res, "Job Posting not found", 404);
    }

    await JobPostingRepo.deleteJobPosting(id, type || "soft");
    return this.successResponse(
      res,
      null,
      `Job Posting ${
        type === "hard" ? "permanently" : "softly"
      } deleted successfully`
    );
  };
}

module.exports = new JobPostingController();
