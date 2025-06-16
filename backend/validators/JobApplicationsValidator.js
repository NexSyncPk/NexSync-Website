const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class JobApplicationValidator extends BaseValidator {
  validateCreateJobApplication = (application) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("Name"),
      email: Joi.string().email().required().label("Email"),
      phoneNumber: Joi.string().required().label("Phone Number"),
      lastEducation: Joi.string()
        .valid("intermediate", "diploma", "undergraduate", "masters")
        .required()
        .label("Last Education"),
      expectedSalary: Joi.number().required().label("Expected Salary"),
      yearOfPassing: Joi.number().required().label("Year of Passing"),
      address: Joi.string().optional().label("Address"),

      availability: Joi.string()
        .valid("remote", "hybrid", "onsite")
        .required()
        .label("Availability"),
      jobPostingsId: Joi.number().required().label("Job Post ID"),
      isDeleted: Joi.boolean().optional(),
    });

    return this.validate(schema, application);
  };
}

module.exports = new JobApplicationValidator();
