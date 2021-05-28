import { Grid } from "@material-ui/core";
import { useParams } from "react-router";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";

export const BookPage = () => {
  const { id } = useParams();
  return (
    <div>
      <Navbar />
      <Grid container alignItems="flex-start" justify="center">
        <h2>Book With Id {id} </h2>
      </Grid>
      <Footer />
    </div>
  );
};
