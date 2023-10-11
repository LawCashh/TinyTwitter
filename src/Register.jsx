import { useEffect, useReducer, useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

function Register({ loggedIn }) {
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

  useEffect(() => {
    if (loggedIn) navigate("/profile");
  }, [loggedIn, navigate]);

  const handleForm = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const { username, password } = registerData;
    // console.log(username, password);
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
      const message = await registerFetch.json();
      if (registerFetch.status === 201) {
        dispatchErr({ type: "reset" });
        setIsLoading(false);
        navigate("/login");
      } else {
        setIsLoading(false);
        dispatchErr({ type: "err", payload: JSON.stringify(message) });
      }
    } catch (error) {
      setIsLoading(false);
      dispatchErr({ type: "err", payload: JSON.stringify(error) });
    }
  };
  return (
    <div className={styles.register}>
      {error && !isLoading && <p>{error.message}</p>}
      {!isLoading && (
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
      )}
      {isLoading && <p>Loading</p>}
    </div>
  );
}

export default Register;
