const TestimonialSectionRepo = require("../repos/TestimonialSectionRepo");
const {
  validateCreateTestimonial,
  validateUpdatedTestimonial,
} = require("../validators/TestimonialSectionValidator");
const BaseController = require("./BaseController");
class TestimonialSectionController extends BaseController {
  constructor() {
    super();
  }
  createTestimonials = async (req, res) => {
    const validationResult = validateCreateTestimonial(req.body);
    if (!validationResult) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const testimonial = await TestimonialSectionRepo.createTestimonial(
      req.body
    );
    return this.successResponse(
      res,
      testimonial,
      "Testimonial created successfully"
    );
  };

  getAllTestimonials = async (req, res) => {
    const {
      sortBy = "createdAt",
      sortOrder = "DESC",
      page = 1,
      limit = 10,
      search = "",
      name,
      company,
      designation,
    } = req.query;
    const offset = (page - 1) * limit;

    const searchCondition = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { company: { [Op.like]: `%${search}%` } },
            { designation: { [Op.like]: `%${search}%` } },
            { feedback: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};
    const filterConditions = {};
    if (name) filterConditions.name = name;
    if (company) filterConditions.company = company;
    if (designation) filterConditions.designation = designation;

    const where = {
      ...searchCondition,
      ...filterConditions,
      isDeleted: false,
    };
    const testimonials = await TestimonialSectionRepo.getAllTestimonials({
      where,

      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [[sortBy, sortOrder.toUpperCase()]],
    });
    return this.successResponse(res, testimonials, "Testimonials fetched");
  };

  getTestimonialById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return this.validationErrorResponse(res, "Id is required in params");
    }
    const testimonial = await TestimonialSectionRepo.getTestimonialById(id);
    if (!testimonial) {
      return this.errorResponse(res, "Testimonial not found", 400);
    }
    return this.successResponse(res, testimonial, "Testimonial fetched");
  };

  updateTestimonial = async (req, res) => {
    const { id } = req.query;
    if (!id) {
      return this.validationErrorResponse(res, "ID is required in query");
    }

    const validationResult = validateUpdatedTestimonial(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    await TestimonialSectionRepo.updateTestimonial(req.body, id);
    const updatedTestimonial = await TestimonialSectionRepo.getTestimonialById(
      id
    );

    return this.successResponse(
      res,
      updatedTestimonial,
      "Testimonial has been Updated"
    );
  };

  deleteTestimonial = async (req, res) => {
    const { id, type } = req.query;
    console.log("ID: ",id, "Type: ", type);
    if (!id) {
      return this.errorResponse(res, "id is required", 400);
    }
    if (type && type !== "soft" && type !== "hard") {
      return this.validationErrorResponse(
        res,
        "Invalid delete type. Use 'soft' or 'hard'"
      );
    }

    const testimonial = await TestimonialSectionRepo.getTestimonialById(id);
    console.log(testimonial)
    if (!testimonial) {
      return this.errorResponse(res, "Testimonial not found", 400);
    }

    await TestimonialSectionRepo.deleteTestimonial(id, type || "soft");
    return this.successResponse(res, null, `Testimonial deleted successfully`);
  };
}

module.exports = new TestimonialSectionController();
