import React, { Component } from "react";
import { Rating } from "semantic-ui-react";

class UserRating extends Component {
  state = { rating: 3 };

  render() {
    const { rating } = this.state;

    return (
      <div>
        <input type="range" min={0} max={5} defaultValue={rating} />
        <br />
        <Rating rating={this.state.rating} maxRating={5} />
      </div>
    );
  }
}

export default UserRating;
