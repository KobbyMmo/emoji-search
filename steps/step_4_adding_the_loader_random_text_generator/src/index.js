import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import ResultsRenderer from "./components/ResultRenderer";

import SentimentStats from "./components/SentimentStats";
import "./index.css";
// import the appbase-js lib
import appbasejs from "appbase-js";
// instantiating appbase-js required
// fields to connect to the dataset
var appbaseRef = appbasejs({
  url: "https://appbase-demo-ansible-abxiydt-arc.searchbase.io",
  app: "emoji-dataset",
  credentials: "f1da7b624918:3331c67d-3477-4b24-aa89-aefc6ca4683e",
});

const App = () => {
  const [searchText, setSearchText] = useState("");
  // indicates whether api has responded or not
  const [isSearching, setIsSearching] = useState(false);
  // keeping record of the fetched results
  const [results, setResults] = useState(null);
  // keep record of sentiment analysis data
  const [sentimentData, setSentimentData] = useState([]);
  // holds currently generated random text
  const currentSelectedRandomText = useRef("");

  // makes a call to the backend to fetch results
  const makeApiCall = () => {
    setIsSearching(true);
    const SEARCH_ID = "emoji_search";
    appbaseRef
      .reactiveSearch(
        [
          {
            id: SEARCH_ID,
            size: 10,
            ...(searchText && { value: searchText }),
          },
        ],
        {
          enableQueryRules: true,
        }
      )
      .then(function (res) {
        setIsSearching(false);
        setResults(res[SEARCH_ID].hits.hits);
        setSentimentData(res.analysis);
      })
      .catch(function (err) {
        console.log("search error: ", err);
      });
  };

  // random text generator funciton
  const generateRandomText = () => {
    const randomTextArray = [
      "Home is the best place to rest",
      "money is awesome but not everything",
      "Slow and steady wins the race",
      "I'm feeling the winter blues",
      "omg so bored & my tattoooos are so itchy!!  help! aha =)",
      "just got back from church, and I totally hate insects.",
      "Sports bikes are fun and interesting",
      "Taking Katie to see Night at the Museum",
      "I love watching the sunset from the mountains",
      "Men do cry, but with attitude",
    ];
    let textIndex = Math.floor(Math.random() * 10);
    while (currentSelectedRandomText.current === randomTextArray[textIndex]) {
      textIndex = Math.floor(Math.random() * 10);
    }

    setSearchText(randomTextArray[textIndex]);
    currentSelectedRandomText.current = randomTextArray[textIndex];
  };

  return (
    <div className="app-root">
      {/* loader overlay */}
      {isSearching && <div className="loader-overlay">Loading...</div>}
      <div className="input-wrapper">
        <input
          name="search-field"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          placeholder="Try searching, 'man swimming' "
        />
        <button id="recommend-btn" onClick={makeApiCall}>
          Recommend
        </button>
        {/* button to generate random text */}
        <button id="random-text-btn" onClick={generateRandomText}>
          Generate Random Text
        </button>
      </div>
      <SentimentStats sentimentData={sentimentData} />
      <div className="result-wrapper">
        <ResultsRenderer results={results} />
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
