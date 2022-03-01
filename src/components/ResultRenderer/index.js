import React from "react";
import ResultItem from "../ResultItem";
import OpenAIItem from "../OpenAIItem";

const ResultsRenderer = ({ results = [], openAIResults = [] }) => {
  const getResultItems = () => {
    if (!results) {
      return (
        <span id="no-results" role="img" aria-label={"no results"}>
          Try searching, "Love in the air!" 😉
        </span>
      );
    }
    if (
      (Array.isArray(results) && !results.length) ||
      (Array.isArray(openAIResults) && !openAIResults.length)
    ) {
      return (
        <span id="no-results" role="img" aria-label={"no results"}>
          🤕 Nothing relevant found!!! Try something else.
        </span>
      );
    }
    return (
      <>
        {results.map((resultItem) => {
          return <ResultItem key={resultItem._id} item={resultItem} />;
        })}
        {openAIResults.map((resultItem) => {
          return <OpenAIItem key={resultItem.text} item={resultItem} />;
        })}
      </>
    );
  };

  return <div className="results-renderer">{getResultItems()}</div>;
};

export default ResultsRenderer;
