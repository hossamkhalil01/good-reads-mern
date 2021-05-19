import "./App.css";
import UserBookStatus from "./components/UserBookStatus";
import PrimeButton from "@material-ui/core/Button";

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
        <UserBookStatus status="Read" onStatusChange={selected => { console.log(selected) }}> </UserBookStatus>
        {/* <Rate readOnly={true} />
        <Rate /> */}
      </div>
    </div>
  );
}

//

export default App;
