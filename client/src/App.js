import "./App.css";
import Footer from "./components/layouts/Footer";
import NavBar from "./components/layouts/NavBar";
import Router from "./components/Router";
import { checkTokenValid } from "./services/authService";


function App() {

  checkTokenValid();
  return (
    <div className="App">
      <NavBar />
      <Router />
      <Footer />
    </div >
  );
}

export default App;
