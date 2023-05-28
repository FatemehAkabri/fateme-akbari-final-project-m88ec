const User = require("../models/userSchema");
const { AppError } = require("../utils/appError");
const { asyncHandler } = require("../utils/async-handler");

const signUp = asyncHandler(async (req, res, next) => {
  const { userId: userSession = null } = req.session;
  if (!!userSession) {
    return next(new AppError(401, "this user already exist,just login!"));
  }

  const {
    firstName,
    lastName,
    userName,
    password,
    gender,
    phoneNumber,
    avatar,
    role,
  } = req.body;

  const userExist = await User.exists({ userName }).select("+password");
  if (!!userExist) return next(new AppError(401, "this username exists"));

  const newUser = await User.create({
    firstName,
    lastName,
    userName,
    password,
    gender,
    phoneNumber,
    role,
    avatar,
  });
  // req.session.userId = newUser._id;
  res.redirect("/login-page");
});

const login = asyncHandler(async (req, res, next) => {
  const { userId: userSession = null } = req.session;
  if (!!userSession)
    return next(new AppError(401, "this user already login,first logout!"));

  const { userName, password } = req.body;

  const user = await User.findOne({ userName }).select("+password");

  if (!user)
    return next(new AppError(401, "!username or password is not match"));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new AppError(401, "username or !password is not match"));

  req.session.user = user;

  res.redirect("/dashboard");
  // res.send("you are login");
});

const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (!!err) return next(err);
  });
  res.send("you are logout");
  // res.render("pages/login-page");
};

const protect = asyncHandler(async (req, res, next) => {
  const { userId } = req.session;

  if (!userId)
    return next(new AppError(401, "you are not logged in, please login first"));

  const user = await User.findById(userId);

  if (!user) return next(new AppError(401, "this user is not exist"));

  next();
});

const restrictTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    const { userId } = req.session;
    const { role } = await User.findById(userId);


    if (!roles.includes(role))
      return next(new AppError(401, "this user doesn't have permission"));

    next();
  });
};

module.exports = { signUp, login, logout, protect, restrictTo };
