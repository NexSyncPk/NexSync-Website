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

  async getAllTeamMembers() {
    return await this.findAll({
      where: { isDeleted: false },
    });
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
