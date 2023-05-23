const createError = require("http");
const User = require("../models/userSchema");

const renderSignup = (req, res, next) => {
  if (req.session.user) res.redirect("pages/login-page");

  res.render("pages/signup-page");
};

const renderLogin = (req, res, next) => {
  if (req.session.user) res.redirect("/dashboard");

  res.render("pages/login-page");
};

const dashboard = (req, res, next) => {
  if (!req.session) {
    console.log("session not save ");
    res.redirect("/login-page");
  }
  console.log(req.session.userId);
  res.render("pages/dashboard", { user: req.session.user });
};

const profile = (req, res, next) => {
  res.render("pages/view-profile", { user: req.session.user });
};

const editProfile = (req, res, next) => {
  res.render("pages/edit-profile", { user: req.session.user });
};

const avatar = (req, res, next) => {
  res.render("pages/upload-avatar", { user: req.session.user });
};

const deleteUser = async (req, res, next) => {
  try {
    console.log("delete");
    const user = await User.findByIdAndDelete(req.session.user._id);
    console.log("ok");

    res.render("pages/login-page");
  } catch (error) {
    console.log(error);
  }
};

const renderArticlesPage = (req, res, next) => {
  console.log("articlesId:", req.session.articleId[0].title);
  console.log("renderArticlesPage");
  res.render("pages/user-article", {
    user: req.session.user,
    articles: req.session.articleId,
  });
};

const renderArticleShowPage = (req, res, next) => {
  console.log("renderArticleShowPage");
  console.log(req.session.articleSession);

  console.log("show article");
  res.render("pages/article-view", {
    user: req.session.user,
    article: req.session.articleSession,
  });
};

const renderNewArticlePage=(req,res,next)=>{
  res.render('')
}

module.exports = {
  renderSignup,
  renderLogin,
  dashboard,
  profile,
  editProfile,
  avatar,
  deleteUser,
  renderArticlesPage,
  renderArticleShowPage
};
