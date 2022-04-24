import "./SuggestionList.css";

export const SuggestionList = ({
  suggestions,
  suggestionIndex,
  showSuggestions,
  apiState,
  onClick,
}) => {
  return apiState === "done" ? (
    suggestions.length > 0 ? (
      <ul className="dropDownContainer">
        {suggestions.map((suggestion, index) => {
          let selectedClass;
          if (index === suggestionIndex) {
            selectedClass = "active";
          }
          return (
            <li key={suggestion.id} className={selectedClass} onClick={onClick}>
              <div className="userContainer">
                <img src={suggestion.avatar_url} alt="img" className="image" />
                <div className="nameAndInfo">
                  <div className="name">{suggestion.login}</div>
                  <div className="info">{suggestion.type}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      showSuggestions && (
        <ul className="dropDownContainer">
          <li>No Results</li>
        </ul>
      )
    )
  ) : apiState === "loading" ? (
    <ul className="dropDownContainer">
      <li>
        <div className="loading"></div>
      </li>
    </ul>
  ) : apiState === "error" ? (
    <ul className="dropDownContainer">
      <li style={{ color: "red" }}>Error in Network Response</li>
    </ul>
  ) : (
    <></>
  );
};
