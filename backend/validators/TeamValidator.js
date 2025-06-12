const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class TeamValidator extends BaseValidator {
  validateCreateTeamMember = (member) => {
    {
      const schema = Joi.object().keys({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        position: Joi.string().required().label("Position"),
        picture: Joi.string().uri().required().label("Picture"),
        description: Joi.string().optional().label("Description"),
        isDeleted: Joi.boolean().optional(),
      });
      return this.validate(schema, member);
    }
  };
  validateUpdatedTeamMember = (member) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("Name"),
      email: Joi.string().email().optional().label("Email"),
      position: Joi.string().optional().label("Position"),
      picture: Joi.string().uri().optional().label("Picture"),
      description: Joi.string().optional().label("Description"),
    });

    return this.validate(schema, member);
  };
}
module.exports = new TeamValidator();
