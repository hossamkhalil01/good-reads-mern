import "./App.css";
import PrimeButton from "@material-ui/core/Button";
import Rate from "./components/Rating";
import Categories from "./pages/CategoriesPage";
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
