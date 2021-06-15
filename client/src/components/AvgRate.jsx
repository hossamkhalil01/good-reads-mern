import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import { useEffect, useState } from "react";
import { getRates } from "../services/ratesService";

const AvgRate = ({ bookId }) => {
  const [rate, setRate] = useState({});
  useEffect(() => {
    const getAvgRate = async () => {
      const { data: { data } } = await getRates(bookId);
      setRate(data);
    };
    getAvgRate();
  }, [bookId]);

  return (
    <div>
      <Box component="fieldset" borderColor="transparent">
        <Rating
          name="read-only"
          precision={0.5}
          value={rate.avg ? rate.avg : 0}
          readOnly
        />
        <span> {rate.count} ratings</span>
      </Box>
    </div>
  );
};

export default AvgRate;
