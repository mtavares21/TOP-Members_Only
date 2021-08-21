const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",
  new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    memberStatus: { type: String, required: true },
  })
);

//Export model
module.exports = User;
