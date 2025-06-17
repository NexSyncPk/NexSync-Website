const Joi = require("joi");
const BaseValidaor = require("./BaseValidator");

class HeroSectionValidator extends BaseValidaor {
  validateUpdatedHeroSection = (data) => {
    const schema = Joi.object({
      heroImage: Joi.string().uri().optional().allow(null, ""),
      noOfProjects: Joi.number().integer().min(0).optional(),
      noOfClients: Joi.number().integer().min(0).optional(),
      satisfactionPercentage: Joi.number().integer().min(0).max(100).optional(),
      isDeleted: Joi.boolean().optional(),
    });
    return this.validate(schema, data);
  };
}
module.exports = new HeroSectionValidator();
