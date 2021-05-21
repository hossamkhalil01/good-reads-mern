import "./App.css";
import Router from "./components/Router";
import { checkTokenValid } from "./services/authService";

import PrimeButton from "@material-ui/core/Button";
import Rate from "./components/Rating";
import Categories from "./pages/CategoriesPage";
function App() {
  checkTokenValid();
  return (
    <div className="App">
      <Router />
      <div>
        <Rate readOnly={true} />
        <Rate />
      </div>
      <div>
        <Categories />
      </div>
    </div>
  );
}

//

export default App;
