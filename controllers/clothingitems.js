const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// export default function clothingItem ({
//   handleCardLike,
// })

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user);
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        return next(new BadRequestError("invalid data"));
      }
      if (e.code === 11000) {
        return next(new ConflictError("this email is already use"));
      }
      return next(e);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => next(e));
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => next(e));
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return next(new ForbiddenError("unauthorized access"));
      }
      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({})
      );
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return next(new BadRequestError("invalid data"));
      }
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not Found"));
      }
      return next(e);
    });
};

const likesItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then(() =>
      ClothingItem.findByIdAndUpdate(
        itemId,
        { $addToSet: { likes: req.user._id } },
        { new: true }
      ).then((item) => res.status(200).send(item))
    )
    .catch((e) => {
      console.error(e);
      if (e.name === "CastError") {
        return next(new BadRequestError("invalid data"));
      }
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not Found"));
      }
      return next(e);
    });
};

const dislikesItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status();
      }
      return ClothingItem.findByIdAndUpdate(
        itemId,
        { $pull: { likes: req.user._id } },
        { new: true }
      ).then((dislikedItem) => res.status(200).send(dislikedItem));
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return next(new BadRequestError("invalid data"));
      }
      if (e.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not Found"));
      }
      return next(e);
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likesItem,
  dislikesItem,
};
