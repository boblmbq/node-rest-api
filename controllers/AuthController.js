const asyncHandler = require("express-async-handler");
const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken");

class AuthController {
  constructor() {
    this.service = AuthService;
  }

  createUser = asyncHandler(async ({ body }, res) => {
    const foudnUser = await this.service.findUser(body.email);

    if (foudnUser) {
      res.status(409);
      new Error("Cannot create an allready existed account");
    }

    const createdUser = await this.service.createUser(body);
    const { name, email } = createdUser;
    res.status(201).json({ name, email });
  });

  loginUser = asyncHandler(async ({ body }, res) => {
    const { email, password } = body;
    const foundUser = await this.service.findUser(email);

    if (!foundUser) {
      res.status(401);
      throw Error(`Bad request, unauthorised`);
    }

    const loginedUser = await this.service.loginUser(
      password,
      foundUser.password
    );

    if (!loginedUser) {
      res.status(401);
      throw new Error("Email or password is invalid");
    }

    const payload = { id: foundUser._id };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });

    res.json({ token });
  });
}

module.exports = new AuthController();
