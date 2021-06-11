const express = require("express");
const router = express.Router();

const {
  getNote,
  createNote,
  editNote,
  deleteNote,
} = require("../controllers/medical.controllers");
router.post("/getNote", getNote);
router.post("/createNote", createNote);
router.patch("/editNote", editNote);
router.post("/deleteNote", deleteNote);

const { registrUser, loginUser } = require("../controllers/login.controllers");
router.post("/registr", registrUser);
router.post("/login", loginUser);

module.exports = router;
