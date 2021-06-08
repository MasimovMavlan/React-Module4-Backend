const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://MasimovMavlan:restart987@cluster0.zxvxm.mongodb.net/MedicalLogin?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/", apiRoutes);

app.listen(5000, () => {
  console.log("Connected");
});
