const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likesItem,
  dislikesItem,
} = require("../controllers/clothingitems");

// CRUD

// Create
router.post("/", auth, createItem);

// Reed

router.get("/", getItems);

// Update

router.put("/:itemId", updateItem);

// Delete

router.delete("/:itemId", auth, deleteItem);

router.delete("/items/:id", auth, likesItem);

router.delete("/items/:id", auth, dislikesItem);

router.module.exports = router;
