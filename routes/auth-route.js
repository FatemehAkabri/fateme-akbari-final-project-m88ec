const router = require("express").Router();
const {
  signUp,
  login,
  logout,
  protect,
} = require("../controllers/auth-controller");
const {
  signUpValidator,
  logInValidator,
} = require("../middleware/auth-validation");
const { validator } = require("../middleware/validation");

router.post("/sign-up", validator(signUpValidator), signUp);

router.post("/login", validator(logInValidator), login);

router.get("/logout", protect, logout);

module.exports = router;
