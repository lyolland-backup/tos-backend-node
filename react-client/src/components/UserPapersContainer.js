import React from "react";
import UserPaper from "./UserPaper";

const UserPapersContainer = ({ userPapers }) => {
  const papers = userPapers.map(paper => (
    <UserPaper key={paper.id} {...paper} />
  ));
  return <div>{papers}</div>;
};

export default UserPapersContainer;
