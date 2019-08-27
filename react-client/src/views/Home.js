import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Home extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="hero-home">
        {user.username === null ? (
          <div className="button-block">
            <Link className="sign-up-button" to="/signup">
              Sign Up
            </Link>
            <Link className="sign-in-button" to="/signin">
              Sign In
            </Link>
          </div>
        ) : (
          <Button className="log-out" onClick={this.props.logOut}>Log Out</Button>
        )}
      </div>
    );
  }
}

export default Home;
