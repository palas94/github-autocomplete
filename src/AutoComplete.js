import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { getUserCache, setUserListToCache } from "./utils/cache";
import { SuggestionList } from "./SuggestionList";
import { debounce } from "lodash";
import "./AutoComplete.css";

export const AutoComplete = (props) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [apiState, setApiState] = useState("");

  const searchGithub = (val) => {
    setApiState("loading");
    axios
      .get("https://api.github.com/search/users", {
        params: { q: val },
        headers: { Authorization: `token ${process.env.REACT_APP_API_KEY}` },
      })
      .catch(function (error) {
        setApiState("error");
      })
      .then((res) => {
        setUserListToCache(val, res.data.items);
        setSuggestions(res.data.items);
        setApiState("done");
      });
  };

  const searchGithubWithDebounce = useCallback(debounce(searchGithub, 500), []);

  const onChange = (e) => {
    setInput(e.target.value);
    if (e.target.value) {
      const val = e.target.value;
      const userCache = getUserCache("USER_CACHE");
      if (userCache.data[val]) {
        setSuggestions(userCache.data[val].listOfUsers);
        setApiState("done");
      } else {
        searchGithubWithDebounce(e.target.value);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setSuggestionIndex(0);
    }
  };

  const onClick = (e) => {
    setInput(e);
    setSuggestions([]);
    setShowSuggestions(false);
    setSuggestionIndex(0);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setInput(suggestions[suggestionIndex].login);
      setSuggestions([]);
      setShowSuggestions(false);
      setSuggestionIndex(0);
    } else if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      } else {
        setSuggestionIndex(suggestionIndex - 1);
      }
    } else if (e.keyCode === 40) {
      if (suggestionIndex === suggestions.length - 1) {
        setSuggestionIndex(0);
      } else {
        setSuggestionIndex(suggestionIndex + 1);
      }
    }
  };

  const onSuggestionsChange = useEffect(() => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
      setSuggestionIndex(0);
    }
  }, [suggestions]);

  return (
    <div className="container">
      <input
        type="text"
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="inputBox"
      ></input>
      <SuggestionList
        suggestions={suggestions}
        suggestionIndex={suggestionIndex}
        showSuggestions={showSuggestions}
        apiState={apiState}
        onClick={onClick}
        errorComponent={props.errorComponent}
      />
    </div>
  );
};
