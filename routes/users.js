const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/users");
router.patch("/me", auth, updateUser);
module.exports = router;
