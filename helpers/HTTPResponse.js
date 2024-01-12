const responseCodes = require("../responses");

module.exports = (res, code, data = {}, message = responseCodes[code]) => {
  const response = { code, message, data };

  return res.status(code).json(response);
};
