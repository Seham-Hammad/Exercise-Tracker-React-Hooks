import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Exercise from "../components/Exercise";

export const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await axios("/exercises/exercisesList");
      //console.log(res.data);
      setExercises(res.data);
    };
    fetchExercises();
  }, []);
  console.log(exercises);

  const ExerciseList = () => {
    return exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  };

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));
    setExercises(exercises.filter((exercise) => exercise.id !== id));
    history.push("/");
  };

  return (
    <div>
      <h3>Logged Exercises..</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Desctiption</th>
            <th>Duration</th>
            <th>Date</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ExerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExerciseList;
