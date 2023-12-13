const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401);
    throw Error("Bad request");
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = userModel.findById(id);

    if (!user) {
      res.status(401)
      throw Error("Not found")
    }

    next(token)
  } catch (error) {
    res.status(401);
    throw Error("Bad request");
  }
};
