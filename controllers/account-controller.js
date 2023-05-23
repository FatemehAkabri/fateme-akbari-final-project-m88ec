const sharp = require("sharp");
const User = require("../models/userSchema");
const { asyncHandler } = require("../utils/async-handler");
const { join } = require("node:path");
const { access, constants, unlink } = require("node:fs/promises");
const { multerUpload } = require("../utils/multer-setting");
const { AppError } = require("../utils/appError");
const article = require("../models/articleSchema");

const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.session;
  const user = await User.findById(userId);

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// resize user avatar
const resizeUserAvatar = async (userId, file = null) => {
  if (!file) return file;

  const avatarFileName = `user-${userId}-${Date.now()}.jpeg`;

  await sharp(file.buffer)
    .resize(100, 100)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(join(__dirname, `../public/images/avatar/${avatarFileName}`));

  return avatarFileName;
};
//upload avatar
const uploadUserAvatar = multerUpload.single("avatar");

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.session;
  const {
    firstName = null,
    lastName = null,
    userName = null,
    gender = null,
    phoneNumber = null,
    role = null,
  } = req.body;

  const user = await User.findById(userId);
  const duplicateUser = await User.findOne({ userName });

  if (!!duplicateUser && duplicateUser.userName !== user.userName) {
    return next(
      new AppError(409, `username: ${userName} already exist, try again`)
    );
  }

  const avatar = await resizeUserAvatar(userId, req.file);
  if (!!avatar && user.avatar !== "user-avatar-default.jpeg") {
    await access(
      join(__dirname, `../public/images/avatar/${user.avatar}`),
      constants.F_OK
    );

    await unlink(join(__dirname, `../public/images/avatar/${user.avatar}`));
  }

  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.userName = userName ?? user.userName;
  user.gender = gender ?? user.gender;
  user.phoneNumber = phoneNumber ?? user.phoneNumber;
  user.role = role ?? user.role;
  user.avatar = avatar ?? user.avatar;

  user.save({ validateModifiedOnly: true });

  // res.redirect("/view-profile");
  res.send(user);
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.session;

  const user = await User.findByIdAndDelete(userId);

  if (user.avatar !== "user-avatar-default.jpeg") {
    await access(
      join(__dirname, `../public/images/avatar/${user.avatar}`),
      constants.F_OK
    );

    await unlink(join(__dirname, `../public/images/avatar/${user.avatar}`));
  }

  req.session.destroy((err) => {
    if (!!err) return next(err);
  });

  // res.redirect("/login-page");
  res.send("delete user");
});

const changePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.session;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId).select("+password");

  const currentPasswordIsMatch = await user.comparePassword(currentPassword);

  if (!currentPasswordIsMatch) {
    return next(new AppError(400, "your current password is not match"));
  }

  user.password = newPassword;

  user.save({ validateModifiedOnly: true });

  // res.redirect("/dashboard");
  res.send(user.password);
});

const getAllArticles = asyncHandler(async (req, res, next) => {
  // show all article
  //pagination
  console.log("getAllArticles function");
  const { user, articleId } = req.session;
  if (!user) return next(new AppError(401, "you dont have permision"));

  const articles = await article.find({ author: user }).populate({
    path: "author",
    select: "firstName,lastName, userName",
  });
  req.session.articleId = articles;

  // if (articles.length==0) return console.log("you dont have any article");;
  // res.status(200).json({
  //   status: "success",
  //   data: { articles },
  // });

  res.redirect("/user-all-articles");
});

const createNewArticle = asyncHandler(async (req, res, next) => {
  const author =
   req.session.userId;

  const { title, discription, thumbnail, content, articlePicturs } = req.body;

  const newArticle = new article({
    title,
    discription,
    thumbnail,
    content,
    articlePicturs,
    author,
  });
  const saved = await newArticle.save();
  console.log(req.session);
  res.redirect()
});

const getArticleById = asyncHandler(async (req, res, next) => {
  console.log("getArticleById");
  const articleId = req.params.id;
  const { articleSession = null } = req.session;

  const articleFind = await article.findOne({ _id: articleId });

  const filteredArticle = { ...articleFind.toObject() };
  req.session.articleSession = filteredArticle;
  console.log(req.session);
  console.log("filteredArticle:", filteredArticle);
  res.redirect("/article-show");
  // res.redirect(`/get-article/${filteredArticle._id}`);
});

// const updateArticle = asyncHandler(async (req, res, next) => {
//   const author = req.session.userId;
//   const { title, discription, thumbnail, content, articlePicturs } = req.body;

//   const user = await User.findById(userId);
//   const duplicateUser = await User.findOne({ userName });

//   if (!!duplicateUser && duplicateUser.userName !== user.userName) {
//     return next(
//       new AppError(409, `username: ${userName} already exist, try again`)
//     );
//   }

//   const avatar = await resizeUserAvatar(userId, req.file);
//   if (!!avatar && user.avatar !== "user-avatar-default.jpeg") {
//     await access(
//       join(__dirname, `../public/images/avatar/${user.avatar}`),
//       constants.F_OK
//     );

//     await unlink(join(__dirname, `../public/images/avatar/${user.avatar}`));
//   }

//   user.firstName = firstName ?? user.firstName;
//   user.lastName = lastName ?? user.lastName;
//   user.userName = userName ?? user.userName;
//   user.gender = gender ?? user.gender;
//   user.phoneNumber = phoneNumber ?? user.phoneNumber;
//   user.role = role ?? user.role;
//   user.avatar = avatar ?? user.avatar;

//   user.save({ validateModifiedOnly: true });

//   // res.redirect("/view-profile");
//   res.send(user);
// });

module.exports = {
  getUser,
  updateUser,
  uploadUserAvatar,
  deleteUser,
  changePassword,
  getAllArticles,
  createNewArticle,
  getArticleById,
};
