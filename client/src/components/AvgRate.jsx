import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import {getRates} from "../services/rateService";
import { useEffect, useState } from "react";

const AvgRate = ({ bookId }) => {
  const [rate, setRate] = useState({});
  useEffect(() => {
    const getAvgRate = async () => {
      const { data } = await getRates(bookId);
      setRate(data);
    };
    getAvgRate();
  }, [bookId]);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="read-only"
          precision={0.5}
          value={rate.avg ? rate.avg : 0}
          readOnly
        />
        <span>{rate.avg} - </span>
        <span> {rate.count} ratings</span>
      </Box>
    </div>
  );
};

export default AvgRate;
