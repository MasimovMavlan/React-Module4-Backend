const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  newUser: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = User = mongoose.model("user", userSchema);
