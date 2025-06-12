const BaseRepo = require("./BaseRepo");
const db = require("../models/index.js");
class JobPostingRepo extends BaseRepo {
  model;
  constructor() {
    super(db.JobPosting);
    this.model = db.JobPosting;
  }

  async createJobPosting(data) {
    await this.create(data);
  }

  async getAllJobPostings() {
    await this.findAll();
  }

  async getJobPostingById(id) {
    await this.findOne({ id });
  }

  async updateJobPosting(data, id) {
    await this.update(data, { id });
  }

  async deleteJobPosting(id, type) {
    await this.delete(id, type);
  }
}
module.exports = new JobPostingRepo();
