import React, { Component } from "react";
import "./App.css";

import { withRouter } from "react-router-dom";
import API from "./adapters/API";
import Joi from "joi";

import CreateRoutes from "./components/Routing";

// this should map to user model validation in rails
// validates :username, uniqueness: { case_sensitive: false }
// validates :password, length: { minimum: 3 }
const schema = Joi.object().keys({
  username: Joi.string()
    .min(1)
    .required(),
  password: Joi.string()
    .min(3)
    .required()
});

class App extends Component {
  state = {
    user: {
      username: null
    },
    loggingUser: false
  };

  componentDidMount() {
    console.log("App has mounted ... 🌈");
    API.validateUser().then(user => {
      if (user.user) {
        this.setState({
          user: {
            username: user.user.data.attributes.username
            // user_id: user.user.data.attributes.id
          }
        });
      }
    });
  }

  validateForm = user => {
    const userData = {
      username: user.username,
      password: user.password
    };
    const result = Joi.validate(userData, schema);
    return !result.error ? true : false;
  };

  submitSignUp = user => {
    if (this.validateForm(user)) {
      console.log("signing up ... 🤓");
      this.setState({
        loggingUser: true
      });
      API.signUpUser(user).then(user => {
        if (user.data !== null) {
          setTimeout(() => {
            this.setState({
              loggingUser: false,
              user: { username: user.data.attributes.username }
            });
            console.log("here are the props => 🎁", this.props);
            this.props.history.push("/"); // takes user back to the 🏠 page
          }, 1000);
        } else {
          console.log("user not valid 🤦‍ 🚑");
          this.setState({
            loggingUser: false // return an alert when sign in fails validation step - use the error handler on back end
          });
        }
      });
    }
  };

  submitSignIn = user => {
    if (this.validateForm(user)) {
      console.log("signing in ... 🤓");
      this.setState({
        loggingUser: true
      });
      API.signInUser(user).then(user => {
        setTimeout(() => {
          this.setState({
            loggingUser: false,
            user: { username: user.data.attributes.username }
          });
          console.log("here are the props => 🎁", this.props);
          this.props.history.push("/"); // takes user back to the 🏠 page
        }, 1000);
      });
    } // return an alert when sign in fails validation step - use the error handler on back end
  };

  signOut = e => {
    e.preventDefault();
    console.log("signing out ... 👋", this.props);
    this.props.history.push("/");
    API.clearToken();
    this.setState({ user: { username: null } });
  };

  render() {
    return (
      <div className="App">
        <CreateRoutes
          user={this.state.user}
          signOut={this.signOut}
          submitSignUp={this.submitSignUp}
          loggingUser={this.state.loggingUser}
          submitSignIn={this.submitSignIn}
        />
      </div>
    );
  }
}

export default withRouter(App);
