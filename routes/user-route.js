const router = require("express").Router();
const { protect, restrictTo } = require("../controllers/auth-controller");
const { getAllUsers } = require("../controllers/user-controller");

router.get("/", protect, restrictTo("admin"), getAllUsers);

module.exports = router;
