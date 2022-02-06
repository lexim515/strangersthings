import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2110-ftb-et-web-pt/";
const API_REGISTER = `${BASE_URL}users/register`;
const API_LOGIN = `${BASE_URL}users/login`;

const AccountForm = ({ setToken, action, error, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const isLogin = action === "login";
  const title = isLogin ? "Login" : "Register";
  const oppositeTitle = isLogin ? "Register" : "Login";
  const oppositeAction = isLogin ? "register" : "login";
  const actionURL = isLogin ? API_LOGIN : API_REGISTER;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isLogin && password !== confirm) {
      setError("Passwords do not match.");
    } else {
      try {
        const response = await fetch(`${actionURL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username,
              password,
            },
          }),
        });
        const info = await response.json();
        if (info.error) {
          return setError(info.error.message);
        }
        setToken(info.data.token);
        localStorage.setItem("token", info.data.token);
        history.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h3 className="main-login">{title}</h3>
      <form className="sign-in" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
        ></input>
        <input
          required
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        ></input>
        {!isLogin ? (
          <input
            required
            value={confirm}
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => {
              e.preventDefault();
              setConfirm(e.target.value);
            }}
          ></input>
        ) : null}
        <button type="submit">{title}</button>
        <p id="error">{error}</p>
        <Link className="link" to={`${oppositeAction}`}>
          Click here to {oppositeTitle}
        </Link>
      </form>
    </>
  );
};

export default AccountForm;


