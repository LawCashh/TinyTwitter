import styles from "./Login.module.css";

function Login({ changeLoginState }) {
  const handleForm = (event) => {
    event.preventDefault();
    changeLoginState();
  };
  return (
    <div className={styles.login}>
      <form className={styles.login__form} onSubmit={(e) => handleForm(e)}>
        <p>Username:</p>
        <input id="usernameInput" type="text" placeholder="Unesi username.." />
        <p>Password:</p>
        <input id="passwordInput" type="password" placeholder="Unesi sifru.." />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
