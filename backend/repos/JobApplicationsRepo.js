const BaseRepo = require("./BaseRepo");

class JobApplicationsRepo extends BaseRepo {
  model;
  constructor() {
    super(db.JobApplications);
    this.model = db.JobApplications;
  }

  async createJobApplication(data) {
    await this.create(data);
  }
  async getAllJobApplications() {
    await this.findAll();
  }

  async getJobApplicationById(id) {
    await this.findOne({ id });
  }
  async deleteJobApplication(id, type) {
    await this.delete({ id, type });
  }
}

module.exports = new JobApplicationsRepo();
