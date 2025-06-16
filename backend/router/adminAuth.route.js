const express = require("express");
const router = express.Router();
const AdminAuthController = require("../controllers/AdminAuthController");
const authenticateAdmin = require("../middlewares/auth.middleware");

router.post("/", AdminAuthController.login);
module.exports = router;
