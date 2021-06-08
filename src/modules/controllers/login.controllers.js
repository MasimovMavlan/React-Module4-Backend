const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../db/models/user/index");

// module.exports.createNewUser = (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then((result) => {
//       res.send({ data: result });
//     })
//     .catch((err) => res.send(`Пользователь уже существует!`));
// };

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
      res.status(200).json({
        token: token,
        user: candidate.user,
      });
    } else {
      res.status(401).json({ message: "Пароль не верный" });
    }
  } else {
    res.status(404).json({ message: "Такого пользователя нет" });
  }
};

module.exports.registrUser = async (req, res) => {
  const candidates = await User.findOne({ user: req.body.user });
  if (candidates) {
    res
      .status(409)
      .json({ message: "Такой Емейл уже занят, попробуйте другой" });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      user: req.body.user,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      res.send("Что то пошло не так");
    }
  }
};
