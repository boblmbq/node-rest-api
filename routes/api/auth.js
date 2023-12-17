const { Router } = require("express");
const validateBody = require("../../middlewares/validateBody");
const router = Router();
const { registerSchema, loginSchema } = require("../../schemas/usersJoiSchema");
const AuthController = require("../../controllers/AuthController");
const authenticate = require("../../middlewares/authenticate");

router.post(
  "/register",
  validateBody(registerSchema),
  AuthController.createUser
);

router.post("/login", validateBody(loginSchema), AuthController.loginUser);

router.put("/logout", authenticate, AuthController.logout);

module.exports = router;
