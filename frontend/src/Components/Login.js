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
      <h2> Log In!</h2>
      <form className="LoginForm" onSubmit={onSubmit}>
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
      <a href="link here">Create New User</a>
      <a href="link here">Forgot Password?</a>
    </div>
  );
}
