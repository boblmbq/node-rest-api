const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

class AuthService {
  constructor() {
    this.User = UserModel;
  }

  findUser = async (email) => {
    const foundUser = await this.User.find({ email });
    return foundUser[0] || null;
  };

  createUser = async (body) => {
    const password = await bcrypt.hash(body.password, 10);
    const createdUser = await this.User.create({
      ...body,
      password,
    });
    return createdUser || null;
  };

  loginUser = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
  };
}

module.exports = new AuthService();
