const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = "dev-jwt";

const {
  getNote,
  createNote,
  editNote,
  deleteNote,
} = require("../controllers/medical.controllers");

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[0];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

router.get("/getNote", checkToken, getNote);
router.post("/createNote", checkToken, createNote);
router.patch("/editNote", checkToken, editNote);
router.delete("/deleteNote", checkToken, deleteNote);

const { registrUser, loginUser } = require("../controllers/login.controllers");
router.post("/registr", registrUser);
router.post("/login", loginUser);

module.exports = router;
