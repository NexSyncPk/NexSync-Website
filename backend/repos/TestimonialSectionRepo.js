const BaseRepo = require("./BaseRepo.js");
const db = require("../models/index.js");

class TestimonialSectionRepo extends BaseRepo {
  constructor() {
    super(db.TestimonialSection);
  }

  async createTestimonial(data) {
    return await this.create(data);
  }

  async getAllTestimonials() {
    return await this.findAll({
      where: { isDeleted: false },
    });
  }
  async getTestimonialById(id) {
    return await this.findOne({ id });
  }

  async updateTestimonial(data, id) {
    return await this.update(data, { id });
  }

  async deleteTestimonial(id, type) {
    if (type === "soft") {
      // Soft delete
      return await this.update({ isDeleted: true }, { id });
    }
    return await this.delete({ id, type });
  }
}

module.exports = new TestimonialSectionRepo();
