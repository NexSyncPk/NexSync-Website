const BaseController = require("./BaseController");
const {
  updatedFindUsSection,
  validateUpdatedFindUsSection,
} = require("../validators/FindUsSectionValidator");
const FindUsSectionRepo = require("../repos/FindUsSectionRepo");
const {
  validationErrorResponse,
  successResponse,
} = require("./HeroSectionController");
class FindUsSectionController extends BaseController {
  constructor() {
    super();
  }
  getFindUsSection = async (req, res) => {
    const findUsSection = await FindUsSectionRepo.getFindUsSection();
    return this.successResponse(res, findUsSection, "Find Us Section fetched");
  };

  // Get only address information
  getFindUsSectionAddress = async (req, res) => {
    const findUsSectionAddress = await FindUsSectionRepo.getFindUsSectionAddress();
    return this.successResponse(res, findUsSectionAddress, "Find Us Section Address fetched");
  };

  // Get only business hours information
  getFindUsSectionBusinessHours = async (req, res) => {
    const findUsSectionBusinessHours = await FindUsSectionRepo.getFindUsSectionBusinessHours();
    return this.successResponse(res, findUsSectionBusinessHours, "Find Us Section Business Hours fetched");
  };

  updateFindUsSection = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required");
    }
    const validationResult = validateUpdatedFindUsSection(req.body);
    if (!validationResult) {
      return validationErrorResponse(res, validationResult.message);
    }

    await FindUsSectionRepo.updateFindUsSection(req.body, id);
    const updatedFindUsSection = await FindUsSectionRepo.getFindUsSection();
    return successResponse(
      res,
      updatedFindUsSection,
      "Find Us section has been updated"
    );
  };

  // Update only address information
  updateFindUsSectionAddress = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required");
    }
    
    // Validate address data (you may want to create a separate validator)
    const { address } = req.body;
    if (!address || address.trim() === "") {
      return this.validationErrorResponse(res, "Address is required");
    }

    await FindUsSectionRepo.updateFindUsSectionAddress(req.body, id);
    const updatedAddress = await FindUsSectionRepo.getFindUsSectionAddress();
    return this.successResponse(
      res,
      updatedAddress,
      "Find Us section address has been updated"
    );
  };

  // Update only business hours information
  updateFindUsSectionBusinessHours = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required");
    }
    
    // Validate business hours data
    const { startDay, endDay, startTime, endTime } = req.body;
    if (!startDay || !endDay || !startTime || !endTime) {
      return this.validationErrorResponse(res, "All business hours fields are required");
    }

    await FindUsSectionRepo.updateFindUsSectionBusinessHours(req.body, id);
    const updatedBusinessHours = await FindUsSectionRepo.getFindUsSectionBusinessHours();
    return this.successResponse(
      res,
      updatedBusinessHours,
      "Find Us section business hours have been updated"
    );
  };
}

module.exports = new FindUsSectionController();
