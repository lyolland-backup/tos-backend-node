import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
class Menu extends Component {
  loggedIn = () => {};

  render() {
    const { user } = this.props;
    console.log("in the nav link bit", user);
    const profilePath = `/users/${user.user_id}`;
    const view =
      user.user_id !== null ? (
        <div className="drop-menu">
          <ul id="menu">
            <input type="text" placeholder="search ..."></input>
            <NavLink
              exact
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
            >
              <li>
                Home<span>🏠</span>
              </li>
            </NavLink>
            <NavLink
              to={profilePath}
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
            >
              <li>
                Profile<span>👩‍🔬</span>
              </li>
            </NavLink>

            <NavLink
              to="/papers"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
            >
              <li>
                Papers<span>📖</span>
              </li>
            </NavLink>

            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
              onClick={this.props.signOut}
            >
              <li>
                Sign Out<span>👋</span>
              </li>
            </NavLink>
          </ul>
        </div>
      ) : (
        <div className="drop-menu">
          <ul id="menu">
            <input type="text" placeholder="search ..."></input>
            <NavLink
              exact
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
            >
              <li>
                Home<span>🏠</span>
              </li>
            </NavLink>

            <NavLink
              to="/papers"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
            >
              <li>
                Papers<span>📖</span>
              </li>
            </NavLink>
          </ul>
        </div>
      );
    return <Fragment>{view}</Fragment>;
  }
}

export default Menu;
