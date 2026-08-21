const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  getUsers,
  createUser,
  updateUser,
  getCurrentUser,
} = require("../controllers/users");
router.patch("/me", auth, updateUser);
router.get("/me", auth, getCurrentUser);
module.exports = router;
