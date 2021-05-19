import "./App.css";
import PrimeButton from "@material-ui/core/Button";
import { BrowserRouter, Route } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <div className="App">
      <h3 className="text-center"> Good Reads Running!</h3>
      <h4 className="text-center mb-5">Testing Libraries: </h4>

      <button className="btn btn-primary mb-3 text-center">Bootstrap </button>
      <div>
        <PrimeButton variant="contained" color="primary">
          Material UI
        </PrimeButton>
      </div>
      <BrowserRouter>
        <div className="App">
          <Route path="/admin/dashboard" exact component={AdminDashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
