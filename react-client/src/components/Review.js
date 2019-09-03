import React, { Component } from "react";

class Review extends Component {
  render() {
    const { content } = this.props;
    return <li>{content}</li>;
  }
}

export default Review;
