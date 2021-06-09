const mongoose = require("mongoose");

const { Schema } = mongoose;

const medicalSchema = new Schema({
  patient: String,
  doctor: String,
  date: Date,
  text: String,
});

module.exports = Medical = mongoose.model("medical", medicalSchema);
