const multer = require("multer");
const { AppError } = require("./appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  file.mimetype.startWith("image")
    ? cb(null, true)
    : cb(new AppError(400, "not an image format, upload image only"), false);
};

const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = {
  multerUpload,
};
