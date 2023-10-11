import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import Cookies from "js-cookie";

function Header({ loggedIn, changeLoginState }) {
  const handleLogout = () => {
    Cookies.remove("loggedIn");
    changeLoginState();
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>TinyTwitter</div>
      <ul className={styles.nav__list}>
        <NavLink to="/" className={styles.nav__list__item}>
          Home
        </NavLink>
        {!loggedIn && (
          <NavLink to="/login" className={styles.nav__list__item}>
            Login
          </NavLink>
        )}
        {!loggedIn && (
          <NavLink to="/register" className={styles.nav__list__item}>
            Register
          </NavLink>
        )}
        {loggedIn && (
          <NavLink to="/profile" className={styles.nav__list__item}>
            Profile
          </NavLink>
        )}
        {loggedIn && (
          <NavLink
            to="/"
            className={styles.nav__list__item}
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        )}
      </ul>
    </nav>
  );
}

export default Header;
