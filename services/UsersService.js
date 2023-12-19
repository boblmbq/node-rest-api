const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

class AuthService {
  constructor() {
    this.User = UserModel;
  }

  findUser = async (req, option) => {
    const foundUser = await this.User.findOne({ [option]: req });
    return foundUser || null;
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
