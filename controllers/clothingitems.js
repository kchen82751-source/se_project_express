const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  SERVER_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND,
} = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        res.status(BAD_REQUEST).send({
          message: "InvalidData",
        });
      }
      res.status(SERVER_ERROR).send({
        message:
          "We are sorry for inconvenience, there's an error from createItem",
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(SERVER_ERROR).send({ message: "Error from getItems", e });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(SERVER_ERROR).send({ message: "Error from updateItem", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return res
          .status(FORBIDDEN_ERROR)
          .send({ message: "unauthorized Access" });
      }
      ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.status(200).send({})
      );
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "invalid Id" });
      }
      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not Found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likesItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status();
      }
      ClothingItem.findByIdAndUpdate(itemId).then(() =>
        res.status(200).send({})
      );
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "invalid Id" });
      }
      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not Found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const dislikesItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status();
      }
      ClothingItem.findByIdAndUpdate(itemId).then(() =>
        res.status(200).send({})
      );
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "invalid Id" });
      }
      if (e.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not Found" });
      }
      return res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
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
