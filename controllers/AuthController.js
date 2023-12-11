const asyncHandler = require("express-async-handler");
const AuthService = require("../services/AuthService");

class AuthController {
  constructor() {
    this.service = AuthService;
  }

  createUser = asyncHandler(async (req, res) => {
    const { body } = req;
    const foudnUser = await this.service.findUser(body.email)
    
    if (foudnUser) {
      res.status(409)
      new Error("User with this email, allready exists, want to login?")
    }

    const createdUser = await this.service.createUser(body);
    const { name, email } = createdUser;
    res.status(201).json({ name, email });
  });
}

module.exports = new AuthController();
