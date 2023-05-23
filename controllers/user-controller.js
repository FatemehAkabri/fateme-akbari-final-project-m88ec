const User = require("../models/userSchema");
const { asyncHandler } = require("../utils/async-handler");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

module.exports = { getAllUsers };
