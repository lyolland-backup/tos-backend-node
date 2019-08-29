import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

class MenuBar extends Component {
  render() {
    const { user, signOut, showMenu } = this.props;
    console.log("this is the current user => 👋", user.user_id);
    const profilePath = `/users/${user.user_id}`;
    const menu =
      user.username === null ? (
        <Fragment>
          <NavLink
            exact
            to="/signin"
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Sign In<span>👋</span>
          </NavLink>
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Home<span>🏠</span>
          </NavLink>

          <NavLink
            exact
            to="/signup"
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Sign Up<span>👋</span>
          </NavLink>
          <NavLink
            onClick={showMenu}
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Menu<span>🍔</span>
          </NavLink>
        </Fragment>
      ) : (
        <Fragment>
          <NavLink
            onClick={signOut}
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Sign Out<span>👋</span>
          </NavLink>
          <NavLink
            exact
            to="/"
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Home<span>🏠</span>
          </NavLink>

          <NavLink
            exact
            to={profilePath}
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Profile<span>👩‍🔬</span>
          </NavLink>
          <NavLink
            onClick={showMenu}
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            Menu<span>🍔</span>
          </NavLink>
        </Fragment>
      );
    return <header>{menu}</header>;
  }
}

export default MenuBar;
