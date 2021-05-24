import "./App.css";
import Router from "./components/Router";
import { checkTokenValid } from "./services/authService";


function App() {

  checkTokenValid();
  return (
    <div className="App">
      <Router />
    </div >
  );
}

export default App;
