const BaseRepository = require("./BaseRepo.js");
const db = require("../models/index.js");

class TeamRepo extends BaseRepository {
  model;
  constructor() {
    super(db.Team);
    this.model = db.Team;
  }

  async createTeamMember(data) {
    return this.create(data);
  }

  async getAllTeamMembers() {
    return this.findAll({
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
    await this.delete({ id, type });
  }
}

module.exports = new TeamRepo();
