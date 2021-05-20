import "./App.css";
import PrimeButton from "@material-ui/core/Button";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminDashboard from "./components/admin/AdminDashboard";
import Categories from "./components/admin/categories/CategoriesView";
import Authors from "./components/admin/authors/AuthorView"

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
      <Switch>
          <Route path="/admin/dashboard" exact  >
            <AdminDashboard/>
          </Route>
          <Route path="/categories" exact>
            <Categories/>
          </Route>
          <Route path="/authors" exact>
            <Authors/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
