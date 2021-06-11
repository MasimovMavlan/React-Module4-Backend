const mongoose = require("mongoose");

const { Schema } = mongoose;

const medicalSchema = new Schema({
  patient: String,
  doctor: String,
  date: String,
  vine: String,
  user: String,
});

module.exports = Medical = mongoose.model("medical", medicalSchema);
