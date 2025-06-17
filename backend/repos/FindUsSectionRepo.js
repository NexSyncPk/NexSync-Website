const BaseRepo = require("./BaseRepo");
const db = require("../models/index.js");
class FindUsSectionRepo extends BaseRepo {
  constructor() {
    super(db.FindUsSection);
  }

  async getFindUsSection() {
    return await this.findOne({});
  }

  async updateFindUsSection(data, id) {
    return this.update(data, { id });
  }
}

module.exports = new FindUsSectionRepo();
