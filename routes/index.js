const router = require("express").Router();
const clothingItem = require("./clothingitems");
const { NOT_FOUND } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");

const userRouter = require("./users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
