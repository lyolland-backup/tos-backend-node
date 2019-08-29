import React, { Component } from "react";
import Paper from "../components/Paper";

class PaperIndexContainer extends Component {
  render() {
    const { allPapers } = this.props;
    console.log("getting these props 🎁", allPapers);

    const papers = allPapers.map(p => (
      <Paper key={p.id} id={p.id} title={p.title} category={p.category}/>
    ));
    return (
      <div>
        <h1>paper index container</h1>
        <ul>{papers}</ul>
      </div>
    );
  }
}

export default PaperIndexContainer;
