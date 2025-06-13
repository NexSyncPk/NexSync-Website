const jwt = require("jsonwebtoken");
const BaseController = require("./BaseController");

class AdminAuthController extends BaseController {
  login = async (req, res) => {
    const { email: inputEmail, password: inputPassword } = req.body;

    if (!inputEmail || !inputPassword) {
      return this.validationErrorResponse(
        res,
        "Username and password required"
      );
    }

    if (
      inputEmail !== process.env.ADMIN_EMAIL ||
      inputPassword !== process.env.ADMIN_PASSWORD
    ) {
      return this.errorResponse(res, "Invalid credentials", 401);
    }

    const token = jwt.sign({ email: inputEmail }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return this.successResponse(res, { token }, "Login successful");
  };
}

module.exports = new AdminAuthController();
