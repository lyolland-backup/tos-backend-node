import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class Paper extends Component {
  upCaseTitles = title =>
    title
      .split(" ")
      .map(t => t[0].toUpperCase() + t.slice(1))
      .join(" ");

  render() {
    const path = `/papers/${this.props.id}`;
    const { title, category, indexType } = this.props;
    console.log(indexType);
    return (
      <li className={`${indexType}-list-item`}>
       { indexType === "main" ? <div className={`${indexType}-rate-block`}>
      <span>+</span>    
      <br/>   
      <span>-</span>
       </div> : null}
        <div className={`${indexType}-title-container`}>
          <Link to={path}>{this.upCaseTitles(title)}</Link>
          <div className={`paper-category-${category.toLowerCase()} `}>
            <span>{category}</span>
          </div>
        </div>
      </li>
    );
  }
}

export default Paper;
