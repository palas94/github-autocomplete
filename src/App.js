import "./App.css";
import { AutoComplete } from "./AutoComplete";
import errorIcon from "./assets/errorIcon.png";

function App() {
  const ErrorComponent = (props) => {
    return props.type === "img" ? (
      <img
        src={errorIcon}
        alt="errorImage"
        style={{ width: "20px", height: "20px" }}
      />
    ) : (
      <div>Error In Network Response</div>
    );
  };
  return (
    <>
      <h1>AutoComplete Demo For DriveTrain</h1>

      <div
        style={{ display: "flex", justifyContent: "space-around" }}
        className="App"
      >
        <AutoComplete errorComponent={() => <ErrorComponent type="img" />} />
        <AutoComplete errorComponent={() => <ErrorComponent type="text" />} />
      </div>
    </>
  );
}

export default App;
