const jwt = require("jsonwebtoken");
const { HTTPError, HTTPResponse } = require("../helpers");
const UserService = require("../services/UserService.js");
const bcrypt = require("bcrypt");
const fs = require("fs/promises");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const uuidv4 = require("uuid").v4;
const { join } = require("path");
const configPath = join(process.cwd(), "config", ".env");
const EmailService = require("../services/EmailService.js");
const asyncHandler = require("express-async-handler");
require("dotenv").config({ path: configPath });

class UserController {
  constructor() {
    this.service = UserService;
  }

  createUser = asyncHandler(async ({ body }, res) => {
    const user = await this.service.findUser(body.email, "email");

    if (user) {
      throw HTTPError(409, "Email in use");
    }

    const avatarURL = gravatar.url(body.email);

    const verificationToken = uuidv4();

    const createdUser = await this.service.createUser({
      ...body,
      avatarURL,
      verificationToken,
    });

    const sendedEmail = await EmailService.sendEmail(
      createdUser.email,
      verificationToken
    );

    if (!sendedEmail) {
      HTTPResponse(
        res,
        201,
        createdUser,
        "User created but verification message has not been sended"
      );
    }

    HTTPResponse(res, 201, createdUser);
  });

  loginUser = asyncHandler(async ({ body: { email, password } }, res) => {
    const user = await this.service.findUser(email, "email");

    if (!user || !bcrypt.compare(password, user.password)) {
      throw HTTPError(401);
    }

    if (!user.verify) {
      throw HTTPError(400, "User not verified");
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "23h",
    });

    user.token = token;
    await user.save();

    HTTPResponse(res, 200, { email: user.email, token: user.token });
  });

  logout = asyncHandler(async (_, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    if (!user) {
      throw HTTPError(401);
    }

    user.token = null;
    await user.save();
    HTTPResponse(res, 204);
  });

  updateSubscription = asyncHandler(async ({ body }, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    if (!user) {
      throw HTTPError(401);
    }

    user.subscription = body.subscription;
    await user.save();

    HTTPResponse(res, 200, {
      email: user.email,
      subscription: user.subscription,
    });
  });

  currentUser = asyncHandler(async (_, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    console.log(user);

    if (!user) {
      throw HTTPError(401);
    }

    HTTPResponse(res, 200, { ...user, password: "000" });
  });

  changeAvatar = asyncHandler(async ({ file }, res) => {
    const user = await this.service.findUser(res.locals.user.id, "_id");

    if (!user) {
      HTTPError(401);
    }

    const { path: tempUpload, originalname } = file;
    const imageNameWithId = `${user.name}_${originalname}`;

    const absolutPath = join("public", "avatars", imageNameWithId);
    const serverPath = join("avatars", imageNameWithId);

    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);

    image.write(absolutPath);
    await fs.rm(tempUpload);

    user.avatarURL = serverPath;
    await user.save();

    HTTPResponse(res, 200, { email: user.email, avatarURL: user.avatarURL });
  });

  verificationRequest = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params;

    const user = await this.service.findUser(
      verificationToken,
      "verificationToken"
    );

    if (!user) {
      throw HTTPError(404, "User not found");
    }

    user.verify = true;
    user.verificationToken = "null";
    await user.save();

    HTTPResponse(res, 200, "Verification successful");
  });

  resendVerificationRequest = asyncHandler(async ({ body }, res) => {
    const user = await this.service.findUser(body.email, "email ");

    if (!user) {
      throw HTTPError(400, "User not found");
    }

    if (!user.verify) {
      const sendedEmail = await EmailService.sendEmail(
        user.email,
        user.verificationToken
      );


      HTTPResponse(res, 200, {}, "Verification email sent");
    }

    throw HTTPError(400, "Verification has already been passed");
  });
}

module.exports = new UserController();
