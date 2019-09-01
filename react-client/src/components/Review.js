import React, { Component } from "react";
import { Link } from "react-router-dom";

class Review extends Component {
  render() {
    const { content } = this.props;
    return <li>{content}</li>;
  }
}

export default Review;
