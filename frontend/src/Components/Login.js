import React from "react";

// to complete form create update & submit functions and create formValue SoS

export default function Login(props) {
  const { updateForm, submitLogin, loginValues } = props;

  const onChange = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    submitLogin();
  };

  return (
    <div className="LoginContainer">
      <form className="loginValues" onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={loginValues.username}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={loginValues.password}
          onChange={onChange}
        ></input>
        <div>
          <button className="LoginButton">Let's Go!</button>
        </div>
      </form>
    </div>
  );
}
