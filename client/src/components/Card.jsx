import { Link } from "react-router-dom";
const Card = ({ object, type }) => {
  return type === "book" ? (
    <div className="card">
      <img
        src="https://via.placeholder.com/150"
        className="card-img-top"
        alt="..."
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
        src="https://via.placeholder.com/150"
        className="card-img-top"
        alt="..."
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
