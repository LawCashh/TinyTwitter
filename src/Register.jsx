import { useReducer } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
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
  const [registerData, dispatch] = useReducer(
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

  const handleForm = async (event) => {
    event.preventDefault();
    const { username, password } = registerData;
    console.log(username, password);
    if (password.length < 8) {
      dispatchErr({
        type: "err",
        payload: "sifra mora imati makar 8 karaktera",
      });
      return;
    }
    try {
      const registerFetch = await fetch(
        "https://blrysfklb5.execute-api.eu-north-1.amazonaws.com/default/register",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      console.log(registerFetch);
      const message = await registerFetch.json();
      console.log(message);
      if (registerFetch.status === 201) {
        dispatchErr({ type: "reset" });
        navigate("/login");
      } else dispatchErr({ type: "err", payload: JSON.stringify(message) });
    } catch (error) {
      console.error("Registration failed:", error);
    }
    console.log(error.message);
  };
  return (
    <div className={styles.register}>
      {error && <p>{error.message}</p>}
      <form className={styles.register__form} onSubmit={handleForm}>
        <p className={styles.register__form__usernametitle}>Username:</p>
        <input
          className={styles.register__form__usernameinput}
          id="usernameInput"
          type="text"
          placeholder="Unesi username.."
          onChange={updateUsername}
        />
        <p className={styles.register__form__passwordtitle}>Password:</p>
        <input
          className={styles.register__form__passwordinput}
          id="passwordInput"
          type="password"
          placeholder="Unesi sifru.."
          onChange={updatePassword}
        />
        <button className={styles.register__form__submitbutton}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
