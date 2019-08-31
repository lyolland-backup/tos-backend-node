import React from "react";
import Paper from "../components/Paper";

const UserPapersContainer = ({ userPapers }) => {
  const papers = userPapers.map(paper => (
    <Paper key={paper.id} id={paper.id} category={paper.category} title={paper.title} />
  ));
  return <ul className="user-papers-container">{papers}</ul>;
};

export default UserPapersContainer;
