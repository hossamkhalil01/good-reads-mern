import { Grid } from "@material-ui/core";
import Register from "../components/Register";
export default function home(props) {
  return (
    <Grid container alignItems="flex-start" justify="center" spacing={2}>
      <Register />
    </Grid>
  );
}
