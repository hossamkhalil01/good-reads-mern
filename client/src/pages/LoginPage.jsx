import { Grid } from "@material-ui/core";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Login from "../components/Login";
export default function Registration(props) {
  return (
    <div>
      <Navbar />
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <h1 className="fw-bold">Log In</h1>
        </div>
      </div>
      <Grid
        container
        alignItems="flex-start"
        justify="center"
        spacing={2}
        className="main-content"
      >
        <Login />
      </Grid>
      <Footer />
    </div>
  );
}
