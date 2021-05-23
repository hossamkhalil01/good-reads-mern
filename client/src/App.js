import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import Authors from "./components/admin/authors/AuthorView";
import Categories from "./components/admin/categories/CategoriesView";
import { checkTokenValid } from "./services/authService";

function App() {
  checkTokenValid();
  return (
    <div className="App">
      {/* <Router /> */}
      <BrowserRouter>
        <Switch>
          <Route path="/admin/dashboard" exact  >
            <AdminDashboard />
          </Route>
          <Route path="/categories" exact>
            <Categories />
          </Route>
          <Route path="/authors" exact>
            <Authors />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

//

export default App;
