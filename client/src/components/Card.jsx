import { Link } from "react-router-dom";
import { hostUrl } from "../api/urls";
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
          <Link to={`/book/${object?._id}`}>{object?.title}</Link>
        </p>
        {object?.authors.map((author) => (
          <p key={author?._id} className="card-text">
            <Link to={`/author/${object?._id}`}>
              {author?.firstName + author?.lastName}
            </Link>
          </p>
        ))}
      </div>
    </div>
  ) : (
    <div className="card">
      <img
        src={`${hostUrl}${object?.photo}`}
        className="card-img-top"
        alt={`${object?.firstName + object?.lastName}'s cover.`}
      />
      <div className="card-body">
        <p className="card-text">
          <Link to={`/author/${object?._id}`}>
            {object?.firstName + object?.lastName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Card;
