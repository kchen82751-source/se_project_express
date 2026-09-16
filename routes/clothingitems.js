const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  validateCreateItem,
  validateDeleteItem,
  validateLikesItem,
  validateDislikesItem,
} = require("../middlewares/validation");

const {
  createItem,
  deleteItem,
  likesItem,
  dislikesItem,
} = require("../controllers/clothingitems");

// CRUD

// Create
router.post("/", auth, validateCreateItem, createItem);

// Reed

// Update

// Delete

router.delete("/:itemId", auth, validateDeleteItem, deleteItem);

router.put("/:itemId/likes", auth, validateLikesItem, likesItem);

router.delete("/:itemId/likes", auth, validateDislikesItem, dislikesItem);

module.exports = router;
