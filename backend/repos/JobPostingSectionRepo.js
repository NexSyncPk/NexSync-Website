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

  async getAllJobPostings(options) {
    return await this.findAll({
      where: {isDeleted: false, isArchived: false}
    });
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
  async toggleArchive(id) {
    const job = await this.model.findOne({ where: { id } });
    if (!job) return null;

    const newStatus = !job.isArchived;
    await this.model.update({ isArchived: newStatus }, { where: { id } });

    return newStatus; // Optional: return new state if needed
  }
  async getArchivedJobs() {
    return  this.model.findAll({
      where: { isArchived: true, isDeleted: false },
            order: [["updatedAt", "DESC"]],
    });
  }
  async getJobPostingsCount() {
    return await this.model.count({
      where: { isDeleted: false, isArchived: false },
    });
  }
}
module.exports = new JobPostingSectionRepo();
