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
      return this.errorResponse(res, "Invalid credentials", 403);
    }

    const token = jwt.sign({ email: inputEmail }, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });

    const user = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    };

    return this.successResponse(res, { token, user }, "Login successful");
  };
}

module.exports = new AdminAuthController();
