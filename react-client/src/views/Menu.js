import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
class Menu extends Component {
  loggedIn = () => {};

  render() {
    const { user } = this.props;
    const profilePath = `/users/${user.user_id}`;
    const view =
      user.user_id !== null ? ( // the menu to be rendered when signed in
        <div className="drop-menu">
          <ul id="menu">
            <input type="text" placeholder="search papers ..."></input>
            <NavLink
              exact
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
              onClick={this.props.showMenu}
            >
              <li>
                Home
                <span role="img" aria-label="Home">
                  🏠
                </span>
              </li>
            </NavLink>
            <NavLink
              to={profilePath}
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
              onClick={this.props.showMenu}
            >
              <li>
                Profile
                <span role="img" aria-label="Profile">
                  👩‍🔬
                </span>
              </li>
            </NavLink>

            <NavLink
              to="/papers"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
              onClick={this.props.showMenu}
            >
              <li>
                Papers
                <span role="img" aria-label="Papers">
                  📖
                </span>
              </li>
            </NavLink>

            <NavLink
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
              onClick={ () => {
                this.props.showMenu()
                this.props.signOut()
              }}
            >
              <li>
                Sign Out
                <span role="img" aria-label="Sign Out">
                  👋
                </span>
              </li>
            </NavLink>
          </ul>
        </div>
      ) : (
        // the menu to be rendered when not signed in
        <div className="drop-menu">
          <ul id="menu">
            <input type="text" placeholder="search papers ..."></input>
            <NavLink
              exact
              to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
              onClick={this.props.showMenu}
            >
              <li>
                Home
                <span role="img" aria-label="Home">
                  🏠
                </span>
              </li>
            </NavLink>

            <NavLink
              to="/papers"
              activeStyle={{
                fontWeight: "bold",
                color: "#f9009a"
              }}
              onClick={this.props.showMenu}
            >
              <li>
                Papers
                <span role="img" aria-label="Papers">
                  📖
                </span>
              </li>
            </NavLink>
          </ul>
        </div>
      );
    return <Fragment>{view}</Fragment>;
  }
}

export default Menu;
