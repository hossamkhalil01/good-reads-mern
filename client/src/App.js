import PrimeButton from "@material-ui/core/Button";
import "./App.css";
import Paginate from "./components/pagination";
function App() {
  return (
    <div className="App">
      <Paginate api="https://jsonplaceholder.typicode.com/todos"></Paginate>
      <h3 className="text-center"> Good Reads Running!</h3>
      <h4 className="text-center mb-5">Testing Libraries: </h4>

      <button className="btn btn-primary mb-3 text-center">Bootstrap </button>
      <div>
        <PrimeButton variant="contained" color="primary">
          Material UI
        </PrimeButton>
      </div>
    </div>
  );
}

export default App;
