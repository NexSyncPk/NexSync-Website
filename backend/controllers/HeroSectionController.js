const BaseController = require("./BaseController");
const HeroSectionRepo = require("../repos/HeroSectionRepo");
const {
  validateUpdatedHeroSection,
} = require("../validators/HeroSectionValidator");

class HeroSectionController extends BaseController {
  constructor() {
    super();
  }

  
  // Utility function to convert relative image paths to full URLs
  convertImagePathToFullUrl = (heroSection, req) => {
    if (heroSection && heroSection.heroImage) {
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      // Only convert if it's a relative path (starts with /uploads/)
      // Don't convert if it's already a full URL (http/https) or external URL
      if (heroSection.heroImage.startsWith('/uploads/')) {
        heroSection.heroImage = `${baseUrl}${heroSection.heroImage}`;
      }
      // If it's already a full URL (http/https), leave it as is
    }
    return heroSection;
  };

  getHeroSection = async (req, res) => {
    const heroSection = await HeroSectionRepo.getHeroSection();
    
    // Convert relative image path to full URL
    const heroSectionWithFullUrl = this.convertImagePathToFullUrl(heroSection, req);
    
    return this.successResponse(res, heroSectionWithFullUrl, "Hero Section fetched");  };

  updateHeroSection = async (req, res) => {
    const { id } = req.query; //section id
    if (!id) {
      return this.validationErrorResponse(res, "ID is required");
    }

    // Validate the body data first (without the file)
    const validationResult = validateUpdatedHeroSection(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    // Prepare the data object
    let updateData = { ...req.body };
    
    // If a file was uploaded, add the hero image path
    if (req.file) {
      updateData.heroImage = `/uploads/heroImages/${req.file.filename}`;
    }

    await HeroSectionRepo.updateHeroSection(updateData, id);

    const updatedHeroSection = await HeroSectionRepo.getHeroSection();
    
    // Convert relative image path to full URL
    const heroSectionWithFullUrl = this.convertImagePathToFullUrl(updatedHeroSection, req);
    
    return this.successResponse(
      res,
      heroSectionWithFullUrl,
      "Hero Section has been updated"
    );
  };
}

module.exports = new HeroSectionController();
