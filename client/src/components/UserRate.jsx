import { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const UserRate = () => {
  const [rate, setRate] = useState(1);
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">Rate</Typography>
      <Rating
        name="customized-empty"
        value={rate}
        precision={0.5}
        onChange={(event, rate) => {
          setRate(rate);
        }}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
    </Box>
  );
};

export default UserRate;
