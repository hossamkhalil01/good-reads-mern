import { useEffect, useState } from "react";
import Card from "../components/Card";
import services from "../services/authorsServices";
const Authors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = async () => {
    const { data } = await services.getAuthors();
    setAuthors(data);
  };
  return (
    <div className="container">
      <div className="row">
        {authors.map((author) => (
          <div key={author?._id} className="col-3 mb-3">
            <Card type="author" object={author} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
