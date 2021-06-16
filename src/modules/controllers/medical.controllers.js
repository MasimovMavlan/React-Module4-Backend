const Medical = require("../../db/models/medical/index");

module.exports.getNote = (req, res) => {
  Medical.find({ user: req.user.user }).then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNote = (req, res) => {
  const medical = new Medical(req.body);
  medical.user = req.user.user;
  medical.save().then((result) => {
    Medical.find({ user: req.user.user }).then((result) => {
      res.send({ data: result });
    });
  });
};

module.exports.editNote = (req, res) => {
  const { _id } = req.body;
  Medical.updateOne({ _id }, req.body).then((result) => {
    Medical.find({ user: req.user.user }).then((result) => {
      res.send({ data: result });
    });
  });
};

module.exports.deleteNote = (req, res) => {
  const { _id } = req.query;
  Medical.deleteOne({ _id }).then((result) => {
    Medical.find({ user: req.user.user }).then((result) => {
      res.send({ data: result });
    });
  });
};
