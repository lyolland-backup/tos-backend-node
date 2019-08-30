import React from "react";
import Paper from "../components/Paper";

const UserPapersContainer = ({ userPapers }) => {
  const papers = userPapers.map(paper => (
    <Paper key={paper.id} id={paper.id} title={paper.title} />
  ));
  return <div className="user-papers-container">{papers}</div>;
};

export default UserPapersContainer;
