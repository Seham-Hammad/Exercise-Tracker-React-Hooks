import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState(["test user"]);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios("/users/userslist");
      console.log(res.data);

      setUsers(res.data.map((user) => user.username));
      setUsername(res.data[0].username);
    };
    fetchData();
  }, []);
  console.log(users);
  console.log(username);

  const addExercise = () => {
    const payload = { username, description, duration, date };
    axios({
      url: "http://localhost:5000/exercises/postExercise",
      method: "post",
      data: payload,
    })
      .then(() => {
        console.log("Exercise added");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(payload);
    history.push("/");
  };

  return (
    <div>
      <h3> Create New Exercise</h3>
      <form>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
            onClick={(e) => addExercise()}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
