const express = require("express");
const router = express.Router();

const {
  getNote,
  createNote,
  editNote,
  deleteNote,
} = require("../controllers/medical.controllers");
router.get("/getNote", getNote);
router.post("/createNote", createNote);
router.patch("/editNote", editNote);
router.delete("/deleteNote", deleteNote);

const { registrUser, loginUser } = require("../controllers/login.controllers");
router.post("/registr", registrUser);
router.get("/login", loginUser);

module.exports = router;
