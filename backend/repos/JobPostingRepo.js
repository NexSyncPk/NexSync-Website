const BaseRepo = require("./BaseRepo");
const db = require("../models/index.js");
class JobPostingRepo extends BaseRepo {
  model;
  constructor() {
    super(db.JobPosting);
    this.model = db.JobPosting;
  }

  async createJobPosting(data) {
    return await this.create(data);
  }

  async getAllJobPostings() {
    return await this.findAll();
  }

  async getJobPostingById(id) {
    return await this.findOne({ id });
  }

  async updateJobPosting(data, id) {
    return await this.update(data, { id });
  }

  async deleteJobPosting(id, type) {
    return await this.delete(id, type);
  }
}
module.exports = new JobPostingRepo();
