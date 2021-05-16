import AvgRate from "./AvgRate";
import UserRate from "./UserRate";

const Rate = ({ readOnly = false }) => {
  return readOnly ? <AvgRate /> : <UserRate />;
};

export default Rate;
