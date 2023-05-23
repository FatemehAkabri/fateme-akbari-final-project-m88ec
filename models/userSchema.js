const { Schema, model } = require("mongoose");
const { isMobilePhone } = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "first name is required!"],
    minlength: [3, "first name must be have at lesat 3 characters"],
    maxlength: [30, "first name must be have less than 30 characters"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is required!"],
    minlength: [3, "last name must be have at lesat 3 characters"],
    maxlength: [30, "last name must be have less than 30 characters"],
    trim: true,
  },
  userName: {
    type: String,
    unique: true,
    required: [true, "last name is required!"],
    minlength: [3, "last name must be have at lesat 3 characters"],
    maxlength: [30, "last name must be have less than 30 characters"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "passwords must be have at least 8characters and contain at least one letter and one digit",
    ],
  },
  gender: {
    type: String,
    enum: ["male", "female", "not-set"],
    default: "not-set",
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    // match: [/^(\\+98|0)?9\\d{9}$/, "Please fill a valid phone number"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "user-avatar-default.jpeg",
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isNew && !this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    return next();
  } catch (err) {
    next(err);
  }
});


UserSchema.methods.comparePassword = function (userPassword) {
	return bcrypt.compare(userPassword, this.password);
};

module.exports = model("user", UserSchema);
