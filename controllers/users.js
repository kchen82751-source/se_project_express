const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validator = require("validator");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// GET /users
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || !validator.isEmail(email)) {
    return next(new BadRequestError("invalid data"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Unauthorized Access"));
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))

    .then((user) => {
      console.log(user);
      const newUser = {
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      };
      res.status(201).send(newUser);
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("invalid data"));
      }
      if (err.code === 11000) {
        return next(new ConflictError("Error occurred, please try again"));
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not Found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("invalid data"));
      }
      return res.status(SERVER_ERROR).send({ message: "server error" });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;
  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User ID Not Found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not Found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("invalid data"));
      }
      return res.status(SERVER_ERROR).send({ message: "server error" });
    });
};

module.exports = { getUsers, createUser, getCurrentUser, updateUser, login };
