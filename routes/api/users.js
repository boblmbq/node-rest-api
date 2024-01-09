const { Router } = require("express");
const router = Router();
const {
  userJoiSchema: {
    registerSchema,
    loginSchema,
    updateAvatarSchema,
    updateSubsSchema,
    resendVerify,
  },
} = require("../../schemas");
const { authenticate, validateBody, upload } = require("../../middlewares");
const { UserController } = require("../../controllers");

router.get("/current", authenticate, UserController.currentUser);

router.get("/verify/:verificationToken", UserController.verificationRequest);

router.post(
  "/register",
  validateBody(registerSchema),
  UserController.createUser
);

router.post(
  "/verify",
  validateBody(resendVerify),
  UserController.resendVerificationRequest
);

router.post("/login", validateBody(loginSchema), UserController.loginUser);

router.patch("/logout", authenticate, UserController.logout);

router.patch(
  "/",
  authenticate,
  validateBody(updateSubsSchema),
  UserController.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  validateBody(updateAvatarSchema),
  upload.single("avatarURL"),
  UserController.changeAvatar
);

module.exports = router;
