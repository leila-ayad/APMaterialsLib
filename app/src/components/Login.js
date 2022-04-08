import React from "react";

export default function Login(props) {
  console.log("its here");
  return (
    <div>
        <h1>Hi </h1>
      <form>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}
