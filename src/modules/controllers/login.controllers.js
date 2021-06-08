const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/user/index");

module.exports.loginUser = async (req, res) => {
  const candidate = await User.findOne({ user: req.body.user });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          user: candidate.user,
          userId: candidate._id,
        },
        "dev-jwt",
        { expiresIn: 60 * 60 }
      );
      res.status(200).send({
        token: token,
        user: candidate.user,
        message: "Вы успешно авторизировались",
      });
    } else {
      res.status(401).send({ message: "Пароль или Логин не верный" });
    }
  }
};

module.exports.registrUser = async (req, res) => {
  const candidates = await User.findOne({ user: req.body.user });
  if (candidates) {
    res
      .status(409)
      .send({ message: "Такой Емейл уже занят, попробуйте другой" });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      user: req.body.user,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      res.status(201).send({ message: "Вы успешно зарегистрировались" });
    } catch (e) {
      res
        .status(500)
        .send({ message: "Сервер не отвечает или что то пошло не так" });
    }
  }
};
