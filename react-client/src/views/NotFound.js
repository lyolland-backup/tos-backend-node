import React, { Component, Fragment } from "react";
import MenuBar from "../components/MenuBar";

class NotFound extends Component {
  render() {
    console.log("the page is not found 🕵️‍ ")
    const { user, signOut } = this.props;

    return (
      <Fragment>
        <MenuBar user={user} signOut={signOut} />
        <h1>NOT FOUND</h1>
      </Fragment>
    );
  }
}
export default NotFound;
