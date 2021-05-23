import { useEffect, useState } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import * as service from "../services/authorsService";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    const getAuthors = async () => {
      const {
        data: { data },
      } = await service.getAuthors();
      setAuthors(data);
    };

    getAuthors();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <Search />
      </div>
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
