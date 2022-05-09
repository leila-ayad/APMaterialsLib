import React, { useState } from "react";
import "./App.css";
import axios from "axios";

import Login from "./Components/Login";
import Register from "./Components/Register";

const initialUser = {username: "", password: ""}

function App() {
  const [loginValues, setLoginValues] = useState(initialUser);
  const [registerValues, setRegisterValues] = useState(initialUser)


  const updateLoginForm = (inputName, inputValue) => {
    setLoginValues({ ...loginValues, [inputName]: inputValue });
  };

  const updateRegisterForm = (inputName, inputValue) => {
    setRegisterValues({...registerValues, [inputName]: inputValue})
  }

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
        updateForm={updateLoginForm}
        submitLogin={submitLogin}
        loginValues={loginValues}
      />
      <Register
        updateForm={updateRegisterForm}
        registerValues={registerValues}
      />
    </div>
  );
}

export default App;
