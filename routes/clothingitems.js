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

router.put("/:itemId", auth, updateItem);

// Delete

router.delete("/:itemId", auth, deleteItem);

router.put("/:itemId/likes", auth, likesItem);

router.delete("/:itemId/likes", auth, dislikesItem);

module.exports = router;
