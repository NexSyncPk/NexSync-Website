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

  // Update only address information
  async updateFindUsSectionAddress(addressData, id) {
    const { address } = addressData;
    return this.update({ address }, { id });
  }

  // Update only business hours information
  async updateFindUsSectionBusinessHours(businessHoursData, id) {
    const { startDay, endDay, startTime, endTime } = businessHoursData;
    return this.update({ startDay, endDay, startTime, endTime }, { id });
  }

  // Get only address information
  async getFindUsSectionAddress() {
    const findUsSection = await this.findOne({});
    if (findUsSection) {
      return {
        id: findUsSection.id,
        address: findUsSection.address,
        pageId: findUsSection.pageId
      };
    }
    return null;
  }

  // Get only business hours information
  async getFindUsSectionBusinessHours() {
    const findUsSection = await this.findOne({});
    if (findUsSection) {
      return {
        id: findUsSection.id,
        startDay: findUsSection.startDay,
        endDay: findUsSection.endDay,
        startTime: findUsSection.startTime,
        endTime: findUsSection.endTime,
        pageId: findUsSection.pageId
      };
    }
    return null;
  }
}

module.exports = new FindUsSectionRepo();
