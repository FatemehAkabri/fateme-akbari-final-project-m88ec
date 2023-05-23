const express = require("express");
const router = express.Router();
const authRouter = require("./auth-route");
const userRouter = require("./user-route");
const accountRouter = require("./account-route");
const articleRouter = require("./article-route");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/article", articleRouter);

module.exports = router;
