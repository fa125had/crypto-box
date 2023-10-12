import "./navBar.css";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar-container">
      {currentPath !== "/" && (
        <NavLink className="navbar-item" to={"/"}>
          Home
        </NavLink>
      )}
      {currentPath !== "/favList" && (
        <NavLink className="navbar-item" to={"/favList"}>
          Favorites
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
