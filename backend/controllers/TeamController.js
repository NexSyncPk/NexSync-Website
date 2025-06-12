const BaseController = require("./BaseController");
const TeamRepo = require("../repos/TeamRepo.js");
const {
  validateCreateTeamMember,
  validateUpdatedTeamMember,
} = require("../validators/TeamValidator.js");
const JobPostingRepo = require("../repos/JobPostingRepo.js");

class TeamController extends BaseController {
  constructor() {
    super();
  }
  createTeamMember = async (req, res) => {
    const validationResult = validateCreateTeamMember(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const teamMember = await TeamRepo.createTeamMember(req.body);
    return this.successResponse(
      res,
      teamMember,
      "Team member created successfully"
    );
  };
  getAllTeamMembers = async (req, res) => {
    const members = await TeamRepo.getAllTeamMembers();
    return this.successResponse(res, members, "Team members fetched");
  };

  getTeamMemberById = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in query");
    }
    const member = await TeamRepo.getTeamMemberById(id);
    if (!member) {
      return this.errorResponse(res, "Team member not found", 404);
    }
    return this.successResponse(res, member, "Team member fetched");
  };

  updateTeamMember = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in query");
    }

    const validationResult = validateUpdatedTeamMember(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const updatedMember = await TeamRepo.updateTeamMember(req.body, id);
    return this.successResponse(
      res,
      updatedMember,
      "Team member has been updated"
    );
  };

  deleteTeamMember = async (req, res) => {
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

    const member = await TeamRepo.getTeamMemberById(id);
    if (!member) {
      return this.errorResponse(res, "Team member not found", 404);
    }

    await TeamRepo.deleteTeamMember(id, type || "soft");
    return this.successResponse(
      res,
      null,
      `Team member ${
        type === "hard" ? "permanently" : "softly"
      } deleted successfully`
    );
  };
}

module.exports = new TeamController();
