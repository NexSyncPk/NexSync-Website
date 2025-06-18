const Joi = require("joi");
const BaseValidator = require("./BaseValidator");

class FindUsSectionValidator extends BaseValidator {
  validateUpdatedFindUsSection = (data) => {
    const schema = Joi.object({
      address: Joi.string().required().label("Address"),
      startDay: Joi.string().required().label("Start Day"),
      endDay: Joi.string().required().label("End Day"),
      startTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .label("Start Time"),

      endTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .label("End Time"),
      isDeleted: Joi.boolean().optional(),
    });
    return this.validate(schema, data);
  };
}

module.exports = new FindUsSectionValidator();
