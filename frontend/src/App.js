import React, { useState } from "react";
import "./App.css";
import axios from "axios";

import Login from "./Components/Login";

function App() {
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const updateForm = (inputName, inputValue) => {
    setLoginValues({ ...loginValues, [inputName]: inputValue });
  };

  const submitLogin = () => {
    const newUser = {
      username: loginValues.username,
      password: loginValues.password,
    };

    axios
      .post(
        "https://abstract-picnic-materials-lib.herokuapp.com/api/login",
        newUser
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <div className="App">
      <Login
        updateForm={updateForm}
        submitLogin={submitLogin}
        loginValues={loginValues}
      />
    </div>
  );
}

export default App;
