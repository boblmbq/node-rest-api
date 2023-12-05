module.exports = (error, _, res) => {
  const statausCode = res.statausCode || res.code || res.status || 500;
  res.status(statausCode).json({ code: statausCode, message: error.stack });
};
