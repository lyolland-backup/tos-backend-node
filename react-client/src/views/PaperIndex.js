import React, { Component } from "react";
import Paper from "../components/Paper";

class PaperIndex extends Component {
  
  render() {
    const { allPapers, sortPapers } = this.props;
    const indexType = "main"
    const papers = allPapers.map(p => (
      <Paper key={p.id} id={p.id} {...p} indexType={indexType} updateRating={this.props.updateRating} />
    ));
    return (
      <div className="all-papers">
        <h1>Papers ...</h1>
        <select onChange={e => sortPapers(e.target.value)}>
          <option value="Ascending">ascending</option>
          <option value="Descending">descending</option>
          <option value="Rating">rating</option>
        </select> 
        
        <div>
          <ul className="papers-list">{papers}</ul>
        </div>
      </div>
    );
  }
}

export default PaperIndex;
