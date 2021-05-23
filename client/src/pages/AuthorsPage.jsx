import { useEffect, useState } from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import * as services from "../services/authorsService";
import Paginator from "../components/Paginator";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  useEffect(() => {
    handlePageChange();
  }, []);

  const handlePageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams({}, { ...pagination, page: newPage });

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await services.getAuthors(params)
    );

    // set the values
    console.log("info: ", paginationInfo);
    setPagination(paginationInfo);
    setAuthors(data);

    console.log("pagination: ", pagination);
  };

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

      <div className="row justify-content-center">
        <div className="col-6">
          <Paginator
            paginationInfo={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Authors;
