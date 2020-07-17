import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const CreateUser = () => {
  const [username, setUsername] = useState("");
  let history = useHistory();

  const createUser = () => {
    const payload = { username };

    axios({
      url: "http://localhost:5000/users/add",
      method: "post",
      data: payload,
    })
      .then((res) => console.log(res.data))

      .catch((err) => {
        console.log(err);
      });
    history.push("/");
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
            onClick={(e) => createUser()}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
