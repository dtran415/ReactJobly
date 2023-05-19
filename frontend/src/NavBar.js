import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./user/UserContext";

function NavBar() {
  const user = useContext(UserContext);
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact="true" to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="nav-item" to="/companies">Companies</NavLink>
            <NavLink className="nav-item" to="/jobs">Jobs</NavLink>
            {user ?
              (
                <>
                  <NavLink className="nav-item" to="/profile">Profile</NavLink>
                  <NavLink className="nav-item" to="/logout">Logout</NavLink>
                </>
              ) : (
                <>
                  <NavLink className="nav-item" to="/signup">Sign Up</NavLink>
                  <NavLink className="nav-item" to="/login">Login</NavLink>
                </>
              )}
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
