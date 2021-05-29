import Box from "@material-ui/core/Box";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  addUserRate,
  updateUserRate,
  userRate,
} from "../services/ratesService";

const UserRate = ({ bookId }) => {
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  let history = useHistory();
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
    if (userId) {
      addUserRate(bookId, userId, newRate);
    } else {
      history.push("/login");
    }
  };

  const updateRate = (newRate) => {
    if (userId) {
      updateUserRate(bookId, userId, newRate);
    } else {
      history.push("/login");
    }
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
