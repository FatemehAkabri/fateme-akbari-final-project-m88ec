const express = require("express");
const {
  renderSignup,
  renderLogin,
  dashboard,
  logout,
  profile,
  editProfile,
  avatar,
  deleteUser,
  renderArticlesPage,
  renderArticleShowPage,
  renderNewArticlePage,
} = require("../controllers/renderPageController");
const router = express.Router();

router.get("/signup-page", renderSignup);

router.get("/login-page", renderLogin);

router.get("/dashboard", dashboard);

router.get("/view-profile", profile);

router.get("/edit-profile", editProfile);

router.get("/upload-avatar", avatar);

router.get("/delete", deleteUser);

router.get("/user-all-articles", renderArticlesPage);

router.get("/article-show/:id", renderArticleShowPage);

router.get("/new-article", renderNewArticlePage);

module.exports = router;
