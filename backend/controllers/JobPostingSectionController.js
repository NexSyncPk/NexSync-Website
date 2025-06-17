const JobPostingSectionRepo = require("../repos/JobPostingSectionRepo");
const { db } = require("sequelize");
const {
  validateCreateJobPosting,
  validateUpdateJobPosting,
} = require("../validators/JobPostingSectionValidator");
const BaseController = require("./BaseController");
const { Op } = require("sequelize");
class JobPostingSectionController extends BaseController {
  constructor() {
    super();
  }

  createJobPosting = async (req, res) => {
    const validationResult = validateCreateJobPosting(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }
    const jobPosting = await JobPostingSectionRepo.createJobPosting(req.body);
    console.log("jobPosting >>>", jobPosting);
    return this.successResponse(
      res,
      jobPosting,
      "Job Posting successfully created"
    );
  };

  getAllJobPostings = async (req, res) => {
    const {
      sortBy = "id",
      sortOrder = "DESC",
      page = 1,
      limit = 10,
      search = "",
      filterByTitle,
      filterByPosition,
      filterByDomain,
      filterByArchived,
    } = req.query;

    const offset = (page - 1) * limit;

    const searchCondition = search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { domain: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const filterConditions = {};
    if (filterByTitle)
      filterConditions.title = { [Op.like]: `%${filterByTitle}%` };
    if (filterByPosition)
      filterConditions.position = { [Op.like]: `%${filterByPosition}%` };
    if (filterByDomain)
      filterConditions.domain = { [Op.like]: `%${filterByDomain}%` };
    if (filterByArchived === "true" || filterByArchived === "false") {
      filterConditions.isArchived = filterByArchived === "true";
    }

    const where = {
      ...searchCondition,
      ...filterConditions,
    };

    const jobPostings = await JobPostingSectionRepo.getAllJobPostings({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    return this.successResponse(
      res,
      jobPostings,
      "Job postings fetched successfully"
    );
  };

  getJobPostingById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in params");
    }
    const jobPosting = await JobPostingSectionRepo.getJobPostingById(id);
    if (!jobPosting) {
      return this.errorResponse(res, "Job Posting not found", 400);
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

    await JobPostingSectionRepo.updateJobPosting(req.body, id);
    const updatedJobPosting = await JobPostingSectionRepo.getJobPostingById(id);
    return this.successResponse(
      res,
      updatedJobPosting,
      "Job Posting has been updated"
    );
  };

  deleteJobPosting = async (req, res) => {
    const { id, type } = req.query;
    if (!id) {
      return this.errorResponse(res, "id is required", 400);
    }
    if (type && type !== "soft" && type !== "hard") {
      return this.validationErrorResponse(
        res,
        "Invalid delete type. Use 'soft' or 'hard'"
      );
    }

    const jobPosting = await JobPostingSectionRepo.getJobPostingById(id);
    if (!jobPosting) {
      return this.errorResponse(res, "Job Posting not found", 400);
    }

    await JobPostingSectionRepo.deleteJobPosting(id, type || "soft");
    return this.successResponse(res, null, `Job Posting deleted successfully`);
  };
  archiveJobPosting = async (req, res) => {
    const { id } = req.query;
    const { archived } = req.body;
    console.log("DEBUG BODY >>>", req.body); // add this line

    if (archived === undefined) {
      return this.validationErrorResponse(
        res,
        "'archived' (true/false) is required in request body"
      );
    }

    const target = await JobPostingSectionRepo.getJobPostingById(id);
    if (!target) {
      return this.errorResponse(res, "Job posting not found", 400);
    }

    const updated = await JobPostingSectionRepo.toggleArchive(id, archived);

    return this.successResponse(
      res,
      null,
      `Job posting ${archived ? "archived" : "unarchived"} successfully`
    );
  };
}

module.exports = new JobPostingSectionController();
