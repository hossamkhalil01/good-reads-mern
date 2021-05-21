import "./App.css";
import Rate from "./components/Rating";
import Router from "./components/Router";
import { checkTokenValid } from "./services/authService";

function App() {
  checkTokenValid();
  return (
    <div className="App">
      <Router />
      <div>
        <Rate readOnly={true} />
        <Rate />
      </div>
    </div>
  );
}

//

export default App;
