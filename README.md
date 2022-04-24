# Installation and Running

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Step 1 : Install nodeJS - https://nodejs.org/en/

Step 2 :

### `npm install`

Step 3 :
Add a .env file in the project root directory with contents -

### `REACT_APP_API_KEY = '<Your-Github-Personal-Access-Token-Here>'`

Step 4 :

### `npm start`

# Design Decisions - Explanation

## No Redux?

Redux is a state management system typically used when the application being constructed is large, and various, often unrelated components need access to the same information. Here the components are a simple search box and a dropdown, both of which can easily communicate with each other via props and callbacks.

## Debounce

Debouncing was implemented so as to not make unnecessary API calls.

### `const searchGithubWithDebounce = useCallback(debounce(searchGithub, 500), []);`

This calls the searchGithub function only after 500 ms. If there is less than 500ms gap between triggering the debounce function, it doesn't execute. This ensures that while the user is typing, unncessary API calls aren't made.

## Caching

Caching was implemented in utils/cache.js. Associated with each keyword is a list of users that Github returned and we stored in our localstorage. If this is found while searching, then no debounced call to searchGithub is made. Rather the component quickly returns the list of users from localStorage.

### `const userCache = getUserCache("USER_CACHE");`

### `if (userCache.data[val]) {`

### `setSuggestions(userCache.data[val].listOfUsers);`

### `setApiState("done");`

### `} else {`

### `searchGithubWithDebounce(e.target.value);`

### `}`

## Api States - Loading, Error and Done

The component maintains API states, displaying a loading spinner when the state is 'loading', an error message when the state is 'error' and the normal list component when the state is 'done'.

## User Interaction - both with Keyboard and Mouse

The component is able to be scrolled both using keyboard (up/down buttons) and mouse scroll. User can select the relevant entry by either pressing 'Enter' or clicking on the entry.
