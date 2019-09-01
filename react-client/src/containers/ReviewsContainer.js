import React, { Component } from "react";
import Review from "../components/Review";

class ReviewContainer extends Component {
  render() {
    const { paperReviews } = this.props;
    const reviews = paperReviews.map((r, idx) => <Review key={idx} {...r} />);
    return <ul className="reviews-container">{reviews}</ul>;
  }
}

export default ReviewContainer;
