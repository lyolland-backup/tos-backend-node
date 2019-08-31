import React, { Component } from "react";
import PaperIndexContainer from "../containers/PaperIndexContainer";

const PaperIndex = ({ allPapers }) => {
  console.log("all papers in paper index!!!!! 🧻", allPapers)

  return <div className="all-papers">
    <h1>Search The Papers ...</h1>
    <PaperIndexContainer allPapers={allPapers} />;
    </div>
};

export default PaperIndex;
