import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const AvgRate = () => {
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">Avg Rate</Typography>
      <Rating name="read-only" precision={0.5} defaultValue={2.5} readOnly />
    </Box>
  );
};

export default AvgRate;
