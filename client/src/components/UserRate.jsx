import Box from "@material-ui/core/Box";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { currentUser } from "../services/authService";
import {
  addUserRate,
  updateUserRate,
  userRate,
} from "../services/ratesService";

const userId = currentUser?._id;

const UserRate = ({ bookId }) => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const getUserRate = async () => {
      try {
        const {
          data: { data },
        } = await userRate(bookId, userId);
        setRate(data.rating || 0);
      } catch (error) {
        setRate(0);
      }
    };
    getUserRate();
  }, [bookId]);

  const rating = (newRate) => {
    setRate(newRate);

    if (rate === 0) return addRate(newRate);
    updateRate(newRate);
  };

  const addRate = (newRate) => {
    addUserRate(bookId, userId, newRate);
  };

  const updateRate = (newRate) => {
    updateUserRate(bookId, userId, newRate);
  };

  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      {/* <Typography component="legend">Rate</Typography> */}
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
