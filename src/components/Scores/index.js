import React from "react";
import PropTypes from "prop-types";

import "./scores.css";

const Scores = ({ score }) => {
  return <div className="Scores">{score}</div>;
};

Scores.propTypes = {
  score: PropTypes.number,
};
export default Scores;
