const BaseRepo = require("./BaseRepo.js");
const db = require("../models/index.js");
class JobPostingSectionRepo extends BaseRepo {
  constructor() {
    super(db.JobPostingSection);
    this.model = db.JobPostingSection;
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
module.exports = new JobPostingSectionRepo();
