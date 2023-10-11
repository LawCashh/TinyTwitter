import { useEffect, useReducer } from "react";
import styles from "./Login.module.css";

function Login({ changeLoginState }) {
  const [loginData, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "usr") state = { ...state, username: action.payload };
      if (action.type === "pw") state = { ...state, password: action.payload };
      if (action.type === "reset") state = { username: "", password: "" };
      return state;
    },
    { username: "", password: "" }
  );

  //   useEffect();

  const updateUsername = (event) => {
    dispatch({ type: "usr", payload: event.target.value });
  };

  const updatePassword = (event) => {
    dispatch({ type: "pw", payload: event.target.value });
  };

  //TODO: napravi handler i promijeni stil
  const handleForm = async (event) => {
    event.preventDefault();
    const { username, password } = loginData;
    console.log(username, password);
    // changeLoginState();
  };
  return (
    <div className={styles.login}>
      <form className={styles.login__form} onSubmit={handleForm}>
        <p>Username:</p>
        <input
          id="usernameInput"
          type="text"
          placeholder="Unesi username.."
          onChange={updateUsername}
        />
        <p>Password:</p>
        <input
          id="passwordInput"
          type="password"
          placeholder="Unesi sifru.."
          onChange={updatePassword}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
