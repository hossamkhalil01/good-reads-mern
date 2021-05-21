import { Grid } from "@material-ui/core";
import Logout from "../components/Logout";
export default function landing() {
  return (
    <Grid container alignItems="flex-start" justify="center" spacing={2}>
      <h1>landing</h1>
      <Logout />
    </Grid>
  );
}
