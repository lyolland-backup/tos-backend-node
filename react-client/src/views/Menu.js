import React, { Component } from "react";
import { NavLink } from "react-router-dom";
class Menu extends Component {
  render() {
    const { user } = this.props;
    console.log("this is the current user => 👋", user.user_id);
    const homePath = `/users/${user.user_id}`;
    return (
      <div className="drop-menu">
        <ul id="menu">
          <input type="text" placeholder="search ..."></input>
          <NavLink
            to={homePath}
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

          <NavLink
            to="/signout"
            activeStyle={{
              fontWeight: "bold",
              color: "#f9009a"
            }}
          >
            <li>
              Sign Out<span>👋</span>
            </li>
          </NavLink>
        </ul>
      </div>
    );
  }
}

export default Menu;
