const router = require("express").Router();
const clothingItem = require("./clothingitems");
const NotFoundError = require("../errors/NotFoundError");
const { login, createUser } = require("../controllers/users");

const userRouter = require("./users");
const { validateSignIn } = require("../middlewares/validation");
const { validateSignUp } = require("../middlewares/validation");
const { validateUsers } = require("../middlewares/validation");
const { validateCardBody } = require("../middlewares/validation");

router.post("/signin", validateSignIn, login);
router.post("/signup", validateSignUp, createUser);

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use = (req, res, next) => next(new NotFoundError("Item not Found"));

module.exports = router;
