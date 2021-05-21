const Card = ({ object }) => {
  return (
    <div className="card">
      <img
        src="https://via.placeholder.com/150"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <p className="card-text">{object?.title}</p>
        {object?.authors.map((author) => (
          <p key={author?._id} className="card-text">
            {author?.firstName + author?.lastName}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Card;
