const errorCodes = require("../responses");

module.exports = (code, message = errorCodes[code]) => {
  const error = new Error(message);
  error.code = code;
  return error;
};
