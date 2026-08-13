const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/users");
router.patch("/me", updateUser);
router.post("/", createUser);
module.exports = router;
