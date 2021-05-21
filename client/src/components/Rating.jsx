import AvgRate from "./AvgRate";
import UserRate from "./UserRate";

const Rate = ({
  readOnly = false,
  bookId = "60a3a229dad82a2457bd6700",
  userId = "60a3e5aa8b2f544b3983fb9c",
}) => {
  return readOnly ? (
    <AvgRate bookId={bookId} />
  ) : (
    <UserRate userId={userId} bookId={bookId} />
  );
};

export default Rate;
