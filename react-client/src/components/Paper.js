import React from "react";
import { Link } from "react-router-dom";

const Paper = ({ title, id, category }) => {
  const path = `/papers/${id}`;
  return (
    <div>
      <Link to={path}>{title}</Link>
      
      <span>{category}</span>
    </div>
  );
};

export default Paper;
