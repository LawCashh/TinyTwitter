import { useEffect, useReducer, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login({ changeLoginState, setUsername, loggedIn }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, dispatchErr] = useReducer(
    (state, action) => {
      if (action.type === "err")
        state = { ...state, hasOne: true, message: action.payload };
      if (action.type === "reset")
        state = { ...state, hasOne: false, message: "" };
      return state;
    },
    { hasOne: false, message: "" }
  );
  const [loginData, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "usr") state = { ...state, username: action.payload };
      if (action.type === "pw") state = { ...state, password: action.payload };
      if (action.type === "reset") state = { username: "", password: "" };
      return state;
    },
    { username: "", password: "" }
  );

  const updateUsername = (event) => {
    dispatch({ type: "usr", payload: event.target.value });
  };

  const updatePassword = (event) => {
    dispatch({ type: "pw", payload: event.target.value });
  };

  useEffect(() => {
    if (loggedIn) navigate("/profile");
  }, [loggedIn, navigate]);

  const handleForm = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const { username, password } = loginData;
    // console.log(username, password);
    try {
      const tokenFetch = await fetch(
        "https://blrysfklb5.execute-api.eu-north-1.amazonaws.com/default/login",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      const message = await tokenFetch.json();
      if (tokenFetch.status === 200) {
        Cookies.set("loggedIn", username, { expires: 10 / (24 * 60) });
        changeLoginState();
        dispatchErr({ type: "reset" });
        setUsername(username);
        setIsLoading(false);
        navigate("/");
      } else {
        dispatchErr({ type: "err", payload: JSON.stringify(message) });
        setIsLoading(false);
      }
    } catch (error) {
      dispatchErr({ type: "err", payload: JSON.stringify(error) });
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.login}>
      {error && !isLoading && <p>{error.message}</p>}
      {!isLoading && (
        <form className={styles.login__form} onSubmit={handleForm}>
          <p className={styles.login__form__usernametitle}>Username:</p>
          <input
            className={styles.login__form__usernameinput}
            id="usernameInput"
            type="text"
            placeholder="Unesi username.."
            onChange={updateUsername}
          />
          <p className={styles.login__form__passwordtitle}>Password:</p>
          <input
            className={styles.login__form__passwordinput}
            id="passwordInput"
            type="password"
            placeholder="Unesi sifru.."
            onChange={updatePassword}
          />
          <button className={styles.login__form__submitbutton}>Login</button>
        </form>
      )}
      {isLoading && <p>Loading</p>}
    </div>
  );
}

export default Login;
