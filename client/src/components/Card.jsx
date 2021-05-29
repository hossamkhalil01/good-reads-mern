import { Link } from "react-router-dom";
import { hostUrl } from "../api/urls";
import "../styles/Card.css";
import { capitalize } from "../utils/utils";

const Card = ({ object, type }) => {
  return type === "book" ? (
    <div className="card">
      <img
        className="card-img-top"
        src={`${hostUrl}${object?.coverImage}`}
        alt={`${object?.title}'s cover`}
      />
      <div className="card-body">
        <p className="card-text">
          <Link to={`/book/${object?._id}`}>{capitalize(object?.title)}</Link>
        </p>
        {object?.authors.map((author) => (
          <p key={author?._id} className="card-text">
            <Link to={`/author/${object?._id}`}>
              {capitalize(author?.firstName) +
                " " +
                capitalize(author?.lastName)}
            </Link>
          </p>
        ))}
      </div>
    </div>
  ) : (
    <div className="card Card">
      <img
        src={`${hostUrl}${object?.photo}`}
        className="custom-card-img"
        alt={`${object?.firstName + object?.lastName}'s cover.`}
      />
      <div className="card-body">
        <p className="card-text">
          <Link to={`/author/${object?._id}`}>
            {capitalize(object?.firstName) + " " + capitalize(object?.lastName)}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Card;
