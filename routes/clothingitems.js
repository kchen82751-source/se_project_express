const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const { validateCreateItem, validateId } = require("../middlewares/validation");

const {
  createItem,
  deleteItem,
  likesItem,
  dislikesItem,
  getItems,
} = require("../controllers/clothingitems");

// CRUD

// Create
router.post("/", auth, validateCreateItem, createItem);

// Reed

router.get("/", getItems);

// Update

// Delete

router.delete("/:itemId", auth, validateId, deleteItem);

router.put("/:itemId/likes", auth, validateId, likesItem);

router.delete("/:itemId/likes", auth, validateId, dislikesItem);

module.exports = router;
