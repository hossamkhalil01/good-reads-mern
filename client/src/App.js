import "./App.css";
import Paginator from "./components/Paginator";
import Router from "./components/Router";
import { checkTokenValid } from "./services/authService";


function App() {
  checkTokenValid();
  return (
    <div className="App">
      <Paginator totalPages={20} onPageChange={(newPage) => console.log(newPage)} ></Paginator>
      <Router />
    </div >
  );
}

//

export default App;
