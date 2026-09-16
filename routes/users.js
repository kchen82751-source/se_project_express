const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { updateUser, getCurrentUser } = require("../controllers/users");
const { validateUpdateUser } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateUpdateUser, updateUser);
module.exports = router;
