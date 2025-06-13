const TestimonialsRepo = require("../repos/TestimonalsRepo");
const {
  validateCreateTestimonial,
  validateUpdatedTestimonial,
} = require("../validators/TestimonalsValidator");
const BaseController = require("./BaseController");
class TestimonalsController extends BaseController {
  constructor() {
    super();
  }
  createTestimonals = async (req, res) => {
    const validationResult = validateCreateTestimonial(req.body);
    if (!validationResult) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    const testimonial = await TestimonialsRepo.createTestimonal(req.body);
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
    };
    const testimonials = await TestimonialsRepo.getAllTestimonals({
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
    const testimonial = await TestimonialsRepo.getTestimonalById(id);
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

    const updatedTestimonial = await TestimonialsRepo.updateTestimonal(
      req.body,
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
    if (!id) {
      return this.errorResponse(res, "id is required", 400);
    }
    if (type && type !== "soft" && type !== "hard") {
      return this.validationErrorResponse(
        res,
        "Invalid delete type. Use 'soft' or 'hard'"
      );
    }

    const testimonial = await TestimonialsRepo.deleteTestimonal(id);
    if (!testimonial) {
      return this.errorResponse(res, "Testimonial not found", 400);
    }

    await TestimonialsRepo.deletetestimonial(id, type || "soft");
    return this.successResponse(res, null, `Testimonial deleted successfully`);
  };
}

module.exports = new TestimonalsController();
