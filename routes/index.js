const router = require("express").Router();
const clothingItem = require("./clothingitems");

const userRouter = require("./users");

const itemsRouter = require("./clothingitems");

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
