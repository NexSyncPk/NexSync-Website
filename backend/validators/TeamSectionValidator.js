const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class TeamSectionValidator extends BaseValidator {  validateCreateTeamMember = (member) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("Name"),
      email: Joi.string().email().required().label("Email"),
      position: Joi.string().required().label("Position"),
      pageId: Joi.number().integer().required(),
      description: Joi.string().required().label("Description"),
      isDeleted: Joi.boolean().optional(),
    });
    return this.validate(schema, member);
  };  validateUpdatedTeamMember = (member) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("Name"),
      email: Joi.string().email().optional().label("Email"),
      position: Joi.string().optional().label("Position"),
      description: Joi.string().optional().label("Description"),
    });

    return this.validate(schema, member);
  };
}
module.exports = new TeamSectionValidator();
