const BaseRepo = require("./BaseRepo");
const db = require("../models/index.js");

class HeroSectionRepo extends BaseRepo {
  model;
  constructor() {
    super(db.HeroSection);
    this.model = db.HeroSection;
  }

  async getHeroSection() {
    return await this.findOne({});
  }

  async updateHeroSection(data, id) {
    return await this.update(data, { id });
  }
}

module.exports = new HeroSectionRepo();
