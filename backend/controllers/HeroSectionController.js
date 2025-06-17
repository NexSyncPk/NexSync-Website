const BaseController = require("./BaseController");
const HeroSectionRepo = require("../repos/HeroSectionRepo");
const {
  validateUpdatedHeroSection,
} = require("../validators/HeroSectionValidator");

class HeroSectionController extends BaseController {
  constructor() {
    super();
  }

  getHeroSection = async (req, res) => {
    const heroSection = await HeroSectionRepo.getHeroSection();
    return this.successResponse(res, heroSection, "Hero Section fetched");
  };

  updateHeroSection = async (req, res) => {
    const { id } = req.query; //section id
    if (!id) {
      return this.validationErrorResponse(res, "ID is required");
    }
    const validationResult = validateUpdatedHeroSection(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    await HeroSectionRepo.updateHeroSection(req.body, id);

    const updatedHeroSection = await HeroSectionRepo.getHeroSection();
    return this.successResponse(
      res,
      updatedHeroSection,
      "Hero Section has been updated"
    );
  };
}

module.exports = new HeroSectionController();
