const Medical = require("../../db/models/medical/index");

module.exports.getNote = (req, res) => {
  Medical.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNote = (req, res) => {
  const medical = new Medical(req.body);
  medical.save().then((result) => {
    Medical.find().then((result) => {
      res.send({ data: result });
    });
  });
};

module.exports.editNote = (req, res) => {
  const { _id } = req.body;
  Medical.updateOne({ _id }, req.body).then((result) => {
    Medical.find().then((result) => {
      res.send({ data: result });
    });
  });
  console.log(req.body);
};

module.exports.deleteNote = (req, res) => {
  const { _id } = req.query;
  Medical.deleteOne({ _id }).then((result) => {
    Medical.find().then((result) => {
      res.send({ data: result });
    });
  });
};
