import React, { Component } from "react";
import { Link } from "react-router-dom";

class Paper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: props.rating
    };
  }

  handleUpRating = () => {
    console.log("👍");
    this.setState({
      rating: this.state.rating + 1
    });
    this.props.updateRating(this.state.rating + 1, this.props.id);
  };

  handleDownRating = () => {
    console.log("👎");
    this.setState({
      rating: this.state.rating - 1
    });
    this.props.updateRating(this.state.rating - 1, this.props.id);
  };

  upCaseTitles = title => {
    return title
      .split(" ")
      .map(t => t[0].toUpperCase() + t.slice(1))
      .join(" ");
  };

  setRatingColor = () => {
    const { rating } = this.state;
    if (rating > 0) return "positive";
    if (rating < 0) return "negative";

    return "even"
  };

  render() {
    const path = `/papers/${this.props.id}`;
    const { title, category, indexType } = this.props;

    return (
      <li className={`${indexType}-list-item`}>
        {indexType === "main" ? (
          <div className={`${indexType}-rate-block`}>
            <span
              className={`${indexType}-rate-up`}
              value="up"
              onClick={this.handleUpRating}
            >
              +
            </span>
            <br />
            <span
              className={`${indexType}-rate-down`}
              value="down"
              onClick={this.handleDownRating}
            >
              -
            </span>
            <br />
            <span
              className={`${indexType}-rate-value ${this.setRatingColor()}`}
            >
              {this.state.rating}
            </span>
          </div>
        ) : null}
        <div className={`${indexType}-title-container `}>
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
