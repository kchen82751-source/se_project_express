const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { updateUser, getCurrentUser } = require("../controllers/users");
const {
  validateUpdateUser,
  validateGetCurrentUser,
} = require("../middlewares/validation");

router.patch("/me", auth, validateUpdateUser, updateUser);
router.get("/me", auth, validateGetCurrentUser, getCurrentUser);
module.exports = router;
