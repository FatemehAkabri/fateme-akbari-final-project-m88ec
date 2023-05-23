const { getAllArticle, createNewArticle } = require("../controllers/article-controller");

const router = require("express").Router();

router.get("/", getAllArticle);
router.post("/", createNewArticle);

module.exports = router;
