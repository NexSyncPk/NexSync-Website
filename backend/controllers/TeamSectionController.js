const BaseController = require("./BaseController.js");
const TeamSectionRepo = require("../repos/TeamSectionRepo.js");
const {
  validateCreateTeamMember,
  validateUpdatedTeamMember,
} = require("../validators/TeamSectionValidator.js");
const db = require("sequelize");
const { Op } = require("sequelize");

class TeamSectionController extends BaseController {
  constructor() {
    super();
  }
  createTeamMember = async (req, res) => {
    if (!req.file) {
      return this.validationErrorResponse(res, "Picture is required");
    }
    const validationResult = validateCreateTeamMember(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const picture = `/uploads/teamMembers/${req.file.filename}`;
    const teamMemberData = {
      ...req.body,
      pageId: parseInt(req.body.pageId),
      picture,
    };
    const teamMember = await TeamSectionRepo.createTeamMember(teamMemberData);
    return this.successResponse(
      res,
      teamMember,
      "Team member created successfully"
    );
  };
  getAllTeamMembers = async (req, res) => {
    const {
      sortBy = "createdAt",
      sortOrder = "DESC",
      page = 1,
      limit = 10,
      search = "",
      name,
      position,
    } = req.query;
    const offset = (page - 1) * limit;

    const searchCondition = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { position: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};
    const filterConditions = {};
    if (name) filterConditions.name = name;
    if (position) filterConditions.position = position;

    const where = {
      ...searchCondition,
      ...filterConditions,
    };
    const members = await TeamSectionRepo.getAllTeamMembers({
      where,
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[sortBy, sortOrder.toUpperCase()]],
    });

    return this.successResponse(res, members, "Team members fetched");
  };

  getTeamMemberById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in params");
    }
    const member = await TeamSectionRepo.getTeamMemberById(id);
    if (!member) {
      return this.errorResponse(res, "Team member not found", 400);
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

    await TeamSectionRepo.updateTeamMember(req.body, id);
    const updatedMember = await TeamSectionRepo.getTeamMemberById(id);
    return this.successResponse(
      res,
      updatedMember,
      "Team member has been updated"
    );
  };

  deleteTeamMember = async (req, res) => {
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

    const member = await TeamSectionRepo.getTeamMemberById(id);
    if (!member) {
      return this.errorResponse(res, "Team member not found", 400);
    }

    await TeamSectionRepo.deleteTeamMember(id, type || "soft");
    return this.successResponse(res, null, `Team member deleted successfully`);
  };
}

module.exports = new TeamSectionController();
