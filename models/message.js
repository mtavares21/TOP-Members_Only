const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = mongoose.model(
  "Message",
  new Schema(
    {
      title: { type: String, required: true },
      text: { type: String, required: false },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  )
);

//Export model
module.exports = Message;
