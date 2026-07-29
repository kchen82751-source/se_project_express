const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  weather: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    require: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not Valid",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model("clothingItems", clothingItemSchema);
