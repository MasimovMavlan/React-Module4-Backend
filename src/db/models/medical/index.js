const mongoose = require("mongoose");

const { Schema } = mongoose;

const medicalSchema = new Schema({
  patient: String,
  doctor: String,
  date: Date,
});

module.exports = Medical.model("medical", medicalSchema);
