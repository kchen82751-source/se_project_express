const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/users");
router.patch("/me", updateUser);
module.exports = router;
