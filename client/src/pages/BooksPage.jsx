import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Category from "../components/Categories";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { getBooks } from "../services/booksService";

const BooksPage = () => {
  const location = useLocation();
  const initCategory = location.category ? location.category : { label: "all" };

  const [category, setCategory] = useState(initCategory);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getFilterdBooks(category._id);
  }, [category]);

  const getFilterdBooks = async (categoryId) => {
    const {
      data: {
        data: { docs },
      },
    } = await getBooks({ categoryId });
    setBooks(docs);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-5 container">
        <div className="row">
          <div className="col-4">
            <aside>
              <Category
                selectedCatgory={category?.label}
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
      </div>
      <Footer />
    </div>
  );
};

export default BooksPage;
