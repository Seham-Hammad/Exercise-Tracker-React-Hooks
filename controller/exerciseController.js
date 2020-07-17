const exerciseModel = require("../models/exerciseModel");
const e = require("cors");

exports.getExercises = (req, res) => {
  exerciseModel
    .find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.addExercise = (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = req.body.duration;
  const date = req.body.date;

  const newExercise = new exerciseModel({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getExerciseById = (req, res) => {
  let id = req.params.id;
  exerciseModel
    .findById(id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("error: " + err));
};
exports.updateExercise = (req, res) => {
  let id = req.params.id;
  exerciseModel
    .findById(id)
    .then((exercise) => {
      (exercise.username = req.body.username),
        (exercise.description = req.body.description),
        (exercise.duration = req.body.duration),
        (exercise.date = req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated ..."))
        .catch((err) => res.status(400).json("error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
exports.deleteById = (req, res) => {
  let id = req.params.id;
  exerciseModel
    .findByIdAndDelete(id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
};
