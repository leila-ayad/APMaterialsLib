import React from "react";

export default function Register(props) {
  const { updateForm, registerValues } = props;

  const onChange = (evt) => {
    const { name, value } = evt.target;
    updateForm(name, value);
  };

  return (
    <div>
      <h2>Welcome to the Picnic!</h2>
      <p>All you have to do is fill out the form below. Happy Creating!</p>
      <form className="RegisterForm">
        <input
          name="username"
          type="text"
          placeholder="username"
          value={registerValues.username}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={registerValues.password}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Re-type password"
          value={registerValues.password}
          onChange={onChange}
        />
        <input
          name="name"
          type="text"
          placeholder="name"
          value={registerValues.name}
          onChange={onChange}
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          value={registerValues.password}
          onChange={onChange}
        />
      </form>
      <button className="RegisterButton">Register New User!</button>
    </div>
  );
}
