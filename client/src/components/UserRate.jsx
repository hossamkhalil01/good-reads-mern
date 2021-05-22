import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { currentUser } from "../services/authService";
import services from "../services/ratesService";

const userId = currentUser._id;

const UserRate = ({ bookId, onSetRate }) => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const getUserRate = async () => {
      const { data: { data } } = await services.userRate(bookId, userId);
      setRate(data.rating || 0);
    };
    getUserRate();
  }, [bookId]);

  const rating = (newRate) => {
    setRate(newRate);
    onSetRate(bookId, newRate);
    if (rate === 0) return addRate(newRate);
    updateRate(newRate);
  };

  const addRate = (newRate) => {
    services.addUserRate(bookId, userId, newRate);
  };

  const updateRate = (newRate) => {
    services.updateUserRate(bookId, userId, newRate);
  };

  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">Rate</Typography>
      <Rating
        name="customized-empty"
        value={rate}
        onChange={(event, rate) => {
          rating(rate);
        }}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
    </Box>
  );
};

export default UserRate;
