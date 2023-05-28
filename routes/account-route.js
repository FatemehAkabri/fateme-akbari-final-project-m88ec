const {
  getUser,
  updateUser,
  uploadUserAvatar,
  deleteUser,
  changePassword,
  getAllArticles,
  createNewArticle,
  getArticleById,
  deleteArticle,
} = require("../controllers/account-controller");
const { protect } = require("../controllers/auth-controller");
const {
  updateUserValidator,
  changePasswordValidation,
} = require("../middleware/account-validation");
const { articleValidation } = require("../middleware/article-validation");
const { validator } = require("../middleware/validation");

//getUser-edit-uploadAvatar-delete-changePassword
const router = require("express").Router();

router.get("/", protect, getUser);

router.patch(
  "/",
  protect,
  uploadUserAvatar,
  validator(updateUserValidator),
  updateUser
);

router.delete("/", protect, deleteUser);

router.put(
  "/change-password",
  protect,
  validator(changePasswordValidation),
  changePassword
);

router.post("/article", validator(articleValidation), createNewArticle);

router.get("/articles", getAllArticles);

router.get("/get-article/:id", getArticleById);

router.get("/delete/:id", deleteArticle);

module.exports = router;
