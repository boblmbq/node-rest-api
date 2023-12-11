const { Router } = require("express");
const validateBody = require("../../middlewares/validateBody");
const router = Router();
const { registerSchema, loginSchema } = require("../../schemas/usersJoiSchema");
const AuthController = require("../../controllers/AuthController")
// signup
router.post("/register", validateBody(registerSchema), AuthController.createUser);

module.exports = router;
