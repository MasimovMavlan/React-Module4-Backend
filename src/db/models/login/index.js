const mongoose = require("mongoose");

const { Schema } = mongoose;

const loginSchema = new Schema({
  email: String,
  password: String,
});

module.exports = Login.model("login", loginSchema);
