const asyncHandler = (asyncController) => (req, res, next) => {
  return asyncController(req, res, next).catch(next);
};

module.exports = { asyncHandler };
