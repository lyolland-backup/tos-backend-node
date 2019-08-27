import React, { Component } from "react";
import "./App.css";

import { Route, Switch, withRouter } from "react-router-dom";
import API from "./adapters/API";

import Home from "./views/Home";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";

class App extends Component {
  state = {
    user: {
      username: null
    }
  };

  componentDidMount() {
    console.log("App has mounted ... 🌈")
    API.validateUser().then(user => {
      if (user.user) {
        this.setState({
          user: {
            username: user.user.data.attributes.username,
            // user_id: user.user.data.attributes.id
          }
        });
      }
    });
  }

  submitSignUp = user => {
    console.log("signing up ... 🤓");
    API.signUpUser(user).then(user => {
      this.setState({
        user: { username: user.data.attributes.username }
        // user_id: user.data.attributes.id
      });
    });
    console.log("here are the props => 🎁", this.props);
    this.props.history.push("/"); // takes user back to the 🏠 page
  };

  submitSignIn = user => {
    console.log("signing in ... 🤓");
    API.signInUser(user).then(user =>
      this.setState({
        user: { username: user.data.attributes.username }
        // user_id: user.data.attributes.id
      })
    );
    console.log("here are the props => 🎁", this.props);
    this.props.history.push("/"); // takes user back to the 🏠 page
  };

  logOut = () => {
    console.log("logging out ... 👋");
    API.clearToken();
    this.setState({ user: { username: null } });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home user={this.state.user} logOut={this.logOut} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => <SignUp submitSignUp={this.submitSignUp} />}
            />
            <Route
              exact
              path="/signin"
              render={() => <SignIn submitSignIn={this.submitSignIn} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
