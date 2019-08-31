import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

class UserRating extends Component {
  state = { rating: 3 };

  render() {
    const { rating } = this.state;
    return (
      <div>
        <Rating rating={rating} maxRating={5} />
      </div>
    );
  }
}

export default UserRating;
