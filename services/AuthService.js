const UserModel = require("../models/user");

class AuthService {
  constructor() {
    this.User = UserModel;
  }

  findUser = async (email) => {
    const foundUser = await this.User.find({ email });
    return foundUser || null
  };

  createUser = async (body) => {
    const createdUser = await this.User.create(body);
    return createdUser || null;
  };
}

module.exports = new AuthService();
