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
}

module.exports = new FindUsSectionController();
