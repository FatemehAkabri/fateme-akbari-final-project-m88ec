const Article = require("../models/articleSchema");
const { asyncHandler } = require("../utils/async-handler");
const user = require("../models/userSchema");

const getAllArticle = asyncHandler(async (req, res, next) => {
  // show all article
  //pagination
  const userId = req.session.user._id;
  // const articles = await Article.find();

  // res.status(200).json({
  //   status: "success",
  //   data: { articles },
  // });
});

// const getArticleById=asyncHandler(async(req,res,next)=>{
//   const {id}=req.session
//   const article=await Article.findById(id)
// })

const createNewArticle = asyncHandler(async (req, res, next) => {
  console.log("articlePicturs:", articlePicturs);
  const { title, discription, thumbnail, content, articlePicturs } = req.body;

  const author = req.session.user._id;

  const newArticle = new Article({
    title,
    discription,
    thumbnail,
    content,
    articlePicturs: articlePicturs,
    author,
  });
  res.send(newArticle.save());
});

// const deleteArticle = asyncHandler(async (req, res, next) => {
//   const { title, discription, thumbnail, content, articlePicturs, author } =
//     req.body;

//   const newArticle = new Article({
//     title,
//     discription,
//     thumbnail,
//     content,
//     articlePicturs,
//     author,
//   });
//   res.send(newArticle.save());
// });

module.exports = { getAllArticle, createNewArticle };
