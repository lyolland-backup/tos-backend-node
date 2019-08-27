import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="hero-home">
        <button onClick={this.props.testClick}>test click</button>
        <Link to="/signup">Sign Up Now</Link>
      </div>
    );
  }
}

export default Home;
