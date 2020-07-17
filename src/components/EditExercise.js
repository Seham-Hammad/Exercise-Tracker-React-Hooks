import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const EditExercise = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/exercises/" + id);
      setUsername(res.data.username);
      setDescription(res.data.description);
      setDuration(res.data.duration);
      setDate(new Date());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:5000/users/userslist");
      setUsers(res.data.map((user) => user.username));
      setUsername(res.data[0].username);
    };
    fetchUsers();
  }, []);

  const editExercise = () => {
    const payload = { username, description, duration, date };

    axios({
      url: "http://localhost:5000/exercises/update/" + id,
      method: "post",
      data: payload,
    })
      .then(() => {
        console.log("Exercise Updated");
      })
      .catch((err) => {
        console.log(err);
      });
    /*  axios
      .post("http://localhost:5000/exercises/update/" + id, payload)
      .then((res) => console.log(res.data)); */

    history.push("/");
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
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
          <label>Duration: </label>
          <input
            type="text"
            required
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
            value="Edit Exercise Log"
            className="btn btn-primary"
            onClick={(e) => editExercise()}
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
