import React, { Component } from "react";
import PaperIndexContainer from "../containers/PaperIndexContainer";

const PaperIndex = ({ allPapers }) => {
  return <PaperIndexContainer allPapers={allPapers} />;
};

export default PaperIndex;
