import AvgRate from "./AvgRate";
import UserRate from "./UserRate";

const Rate = ({
  readOnly = false,
  bookId,
}) => {
  return readOnly ? (
    <AvgRate bookId={bookId} />
  ) : (
    <UserRate bookId={bookId} />
  );
};

export default Rate;
