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
    return await this.findAll();
  }

  async getJobApplicationById(id) {
    return await this.findOne({ id });
  }
  async deleteJobApplication(id, type) {
    await this.delete({ id, type });
  }
}

module.exports = new JobApplicationsRepo();
