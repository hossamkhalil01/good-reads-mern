import { Grid } from "@material-ui/core";
import Login from "../components/Login";
import Register from "../components/Register";
export default function Registration(props) {
  return (
    <Grid container alignItems="flex-start" justify="center" spacing={2}>
      <Register />
      <Login />
    </Grid>
  );
}
