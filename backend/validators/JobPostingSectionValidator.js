const Joi = require("joi");
const BaseValidator = require("./BaseValidator.js");

class JobPostingSectionValidator extends BaseValidator {
  validateCreateJobPosting = (jobPosting) => {
    const schema = Joi.object().keys({
      title: Joi.string().required().label("Job Title"),
      position: Joi.string()
        .valid("full-time", "part-time", "intern", "contract")
        .required()
        .label("Position"),
      description: Joi.string().required().label("Description"),
      jobType: Joi.string()
        .valid("remote", "hybrid", "onsite")
        .optional()
        .label("Job Type"),
      domain: Joi.string().required().label("Domain"),
      salary: Joi.number().integer().optional().label("Salary"),
      pageId: Joi.number().integer().required(),
      requirements: Joi.array()
        .items(Joi.string())
        .required()
        .label("Requirements"),
      isArchived: Joi.boolean().optional().label("Is Archived"),
      isDeleted: Joi.boolean().optional().label("Is Deleted"),
    });

    return this.validate(schema, jobPosting);
  };

  validateUpdateJobPosting = (jobPosting) => {
    const schema = Joi.object().keys({
      title: Joi.string().optional().label("Job Title"),
      position: Joi.string()
        .valid("full-time", "part-time", "intern", "contract")
        .optional()
        .label("Position"),
      description: Joi.string().optional().label("Description"),
      jobType: Joi.string()
        .valid("remote", "hybrid", "onsite")
        .optional()
        .label("Job Type"),
      domain: Joi.string().optional().label("Domain"),
      salary: Joi.number().integer().optional().label("Salary"),
      requirements: Joi.array()
        .items(Joi.string())
        .optional()
        .label("Requirements"),
      isArchived: Joi.boolean().optional().label("Is Archived"),
      isDeleted: Joi.boolean().optional().label("Is Deleted"),
    });

    return this.validate(schema, jobPosting);
  };
}

module.exports = new JobPostingSectionValidator();
