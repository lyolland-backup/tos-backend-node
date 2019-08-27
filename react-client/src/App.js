import React, { Component } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";

import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";

class App extends Component {
  testClick = () => console.log("call back worked ...🙃");

  render() {
    return (
      <div className="App">
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home testClick={this.testClick} />}
            />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route exact path="/signin" render={() => <SignIn />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
