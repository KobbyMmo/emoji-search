import React from "react";

const ResultItem = ({ text }) => {
  return (
    <div className="result-item">
      <span id="emoji-wrapper" role="img" aria-label={text}>
        {text}
      </span>
    </div>
  );
};

export default ResultItem;
