module.exports = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(error.message);
      return;
    }
    next();
  };
};
