const { Router } = require("express");
const validateBody = require("../../middlewares/validateBody");
const router = Router();
const {
  registerSchema,
  loginSchema,
  updateSubsSchema,
} = require("../../schemas/usersJoiSchema");
const UsersController = require("../../controllers/UsersController");
const authenticate = require("../../middlewares/authenticate");

router.post(
  "/register",
  validateBody(registerSchema),
  UsersController.createUser
);

router.post("/login", validateBody(loginSchema), UsersController.loginUser);

router.patch(
  "/",
  validateBody(updateSubsSchema),
  authenticate,
  UsersController.updateSubscription
);

router.patch("/logout", authenticate, UsersController.logout);

router.get("/current", authenticate, UsersController.getCurrentContacts);
module.exports = router;
