const BaseRepo = require("./BaseRepo.js");
const db = require("../models/index.js");

class TeamSectionRepo extends BaseRepo {
  model;
  constructor() {
    super(db.TeamSection);
    this.model = db.TeamSection;
  }

  async createTeamMember(data) {
    return this.create(data);
  }
  async getAllTeamMembers(options = {}) {
    const defaultOptions = {
      where: { isDeleted: false },
    };
    
    // Merge with provided options
    const queryOptions = {
      ...defaultOptions,
      ...options,
      where: {
        ...defaultOptions.where,
        ...options.where,
      },
    };
    
    return this.findAll(queryOptions);
  }

  async getTeamMemberById(id) {
    return this.findOne({ id });
  }

  async updateTeamMember(data, id) {
    return await this.update(data, { id });
  }
  async deleteTeamMember(id, type) {
    await this.delete(id, type);
  }
}

module.exports = new TeamSectionRepo();
