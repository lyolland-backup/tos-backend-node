import React, { Component } from "react";
import PaperIndexContainer from "../containers/PaperIndexContainer";

const PaperIndex = ({ allPapers }) => {
  return <div className="all-papers">
    <PaperIndexContainer allPapers={allPapers} />;
    </div>
};

export default PaperIndex;
