import React, { Component, Fragment } from "react";

class NotFound extends Component {
  render() {
    console.log("the page is not found 🕵️‍ ")
    return (
      <div className="not-found">
        <h1 > NOT FOUND <span role="img" aria-label="page not found">🕵️‍</span></h1>
      </div>
    );
  }
}
export default NotFound;
