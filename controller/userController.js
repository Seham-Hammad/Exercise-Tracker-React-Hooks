const userModel = require("../models/userModel");

exports.getUsers = (req, res) => {
  userModel
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.addUser = (req, res) => {
  let body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide user to add",
    });
  }
  let user = new userModel(body);
  if (!user) {
    return res.status(400).json({
      success: false,
      error: err,
    });
  }
  user
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: exercise._id,
        message: "User added",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        err,
        message: "User not created!",
      });
    });
};
