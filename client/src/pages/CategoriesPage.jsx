import { useEffect, useState } from "react";
import Card from "../components/Card";
import Category from "../components/Categories";
import { getBooksByCatgoryId } from "../services/booksService";
const Categories = () => {
  const [category, setCategory] = useState({
    label: "all",
  });

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getFilterdBooks(category._id);
  }, [category]);

  const getFilterdBooks = async (categoryId) => {
    const { data: { data } } = await getBooksByCatgoryId(categoryId);
    setBooks(data);
  };

  return (
    <div className="container">
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
  );
};

export default Categories;
