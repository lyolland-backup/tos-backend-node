import React, { Component } from "react";
import { Link } from "react-router-dom";

class Paper extends Component {

  upCaseTitles = title =>
    title
      .split(" ")
      .map(t => t[0].toUpperCase() + t.slice(1))
      .join(" ");

  render() {
    const path = `/papers/${this.props.id}`;
    const { title, category } = this.props;
    return (
      <li>
        <div>
          {" "}
          <Link to={path}>{this.upCaseTitles(title)}</Link>{" "}
        </div>
        <div className={`paper-category-${category.toLowerCase()}`}>
          {" "}
          <span>{category}</span>
        </div>
      </li>
    );
  }
}

export default Paper;
