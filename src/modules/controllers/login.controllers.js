const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/user/index");
const secret = "dev-jwt";

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
        },
        secret,
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
      .send({ message: "Такой Логин уже занят, попробуйте другой" });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      user: req.body.user,
      password: bcrypt.hashSync(password, salt),
    });

    await user.save();

    const token = jwt.sign(
      {
        user: req.body.user,
      },
      secret,
      { expiresIn: 60 * 60 }
    );

    res.status(201).send({
      token: token,
      user: req.body.user,
      message: "Вы успешно зарегистрировались",
    });
  }
};
