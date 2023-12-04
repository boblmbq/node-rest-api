const { isValidObjectId } = require("mongoose");

module.exports = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    res.status(400);
    throw new Error(`ID: ${contactId}, is not valid`);
  }
  next()
};
