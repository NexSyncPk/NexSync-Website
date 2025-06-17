const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class TestimonialSectionValidator extends BaseValidator {
  validateCreateTestimonial = (testimonial) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("Name"),
      designation: Joi.string().required().label("Designation"),
      company: Joi.string().required().label("Company"),
      feedback: Joi.string().required().label("Feedback"),
      isDeleted: Joi.boolean().optional().label("Is Deleted"),
      pageId: Joi.number().integer().required(),
    });

    return this.validate(schema, testimonial);
  };

  validateUpdatedTestimonial = (testimonial) => {
    const schema = Joi.object()
      .keys({
        name: Joi.string().optional().label("Name"),
        designation: Joi.string().optional().label("Designation"),
        company: Joi.string().optional().label("Company"),
        feedback: Joi.string().optional().label("Feedback"),
        isDeleted: Joi.boolean().optional().label("Is Deleted"),
      })
      .min(1);

    return this.validate(schema, testimonial);
  };
}

module.exports = new TestimonialSectionValidator();
