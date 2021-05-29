import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Category from "../components/Categories";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import Paginator from "../components/Paginator";
import { getBooks } from "../services/booksService";
import {
  createPaginationParams,
  parsePaginatedResponse,
} from "../utils/pagination";
import { capitalize } from "../utils/utils";

const BooksPage = () => {
  const location = useLocation();
  const initCategory = location.category ? location.category : { label: "all" };

  const [category, setCategory] = useState(initCategory);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [books, setBooks] = useState([]);

  useEffect(() => {
    handlePageChange();
  }, [category]);

  const handlePageChange = async (newPage) => {
    // construct the params
    const params = createPaginationParams(
      { categories: category?._id },
      { ...pagination, page: newPage }
    );

    // get the new page from api
    const { data, paginationInfo } = parsePaginatedResponse(
      await getBooks(params)
    );

    // set the values
    setPagination(paginationInfo);
    setBooks(data);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-5 container main-content">
        <div className="row">
          <div className="col-4">
            <aside>
              <Category
                selectedCatgory={capitalize(category?.label)}
                onSetCategory={setCategory}
              />
            </aside>
          </div>
          <div className="col-8">
            <div className="row">
              {books.length > 0 ? (
                books.map((book) => (
                  <div key={book?._id} className="col-4 mb-3">
                    <Card type="book" object={book} />
                  </div>
                ))
              ) : (
                <div className="alert alert-info">
                  <h3 className="text-center">No books in this category</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-4">
            <Paginator
              paginationInfo={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BooksPage;
