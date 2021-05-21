import "./App.css";
import Router from "./components/Router";
import { checkTokenValid } from "./services/authService";

function App() {
  checkTokenValid();
  return (
    <div className="App">
      {/* <h4 className="text-center mb-5">Testing Libraries: </h4>

      <button className="btn btn-primary mb-3 text-center">Bootstrap </button>
      <div>
        <PrimeButton variant="contained" color="primary">
          Material UI
        </PrimeButton>
      </div> */}
      {/* <Register /> */}
      <Router />
    </div>
  );
}

export default App;
