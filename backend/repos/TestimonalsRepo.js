const BaseRepo = require("./BaseRepo");
const db = require("../models/index.js");

class TestimonalsRepo extends BaseRepo {
  model;
  constructor() {
    super(db.Team);
    this.model = db.Team;
  }

  async createTestimonal(data) {
    return await thiss.create(data);
  }

  async getAllTestimonals() {
    return await this.findAll({
      where: { isDeleted: false },
    });
  }
  async getTestimonalById(id) {
    return await this.findOne({ id });
  }

  async updateTestimonal(data, id) {
    return await this.update(data, { id });
  }

  async deleteTestimonal(id, type) {
    return await this.delete({ id, type });
  }
}

module.exports = new TestimonalsRepo();
