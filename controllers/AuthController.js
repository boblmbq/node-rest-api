const asyncHandler = require("express-async-handler");
const AuthService = require("../services/AuthService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthController {
  constructor() {
    this.service = AuthService;
  }

  createUser = asyncHandler(async ({ body }, res) => {
    const foudnUser = await this.service.findUser(body.email);

    if (foudnUser) {
      res.status(409);
      new Error("Email in use");
    }

    const createdUser = await this.service.createUser(body);

    res.status(201).json({
      code: 201,
      message: "Created",
      user: {
        email: createdUser.email,
        subscription: createdUser.subscription,
      },
    });
  });

  loginUser = asyncHandler(async ({ body }, res) => {
    const { email, password } = body;
    const user = await this.service.findUser(email, "email");

    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401);
      throw Error("Email or password is wrong");
    }

    const payload = { id: user._id };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      code: 200,
      message: "ok",
      token: user.token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  });

  logout = asyncHandler(async (_, res) => {
    const { locals } = res;
    const user = await this.service.findUser(locals.user.id, "_id");
    user.token = null;
    await user.save();
    res.status(204).json({ code: 204, message: "No Content" });
  });
}

module.exports = new AuthController();
