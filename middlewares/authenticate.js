const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  try {
    if (bearer === "Bearer" && token) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      res.locals.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401);
    throw Error("Not authorized");
  }
};
