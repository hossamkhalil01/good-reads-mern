import { useEffect, useState } from "react";
import Card from "../components/Card";
import Category from "../components/Categories";
import services from "../services/booksService";
const Categories = () => {
  const [category, setCategory] = useState({
    _id: "1",
    label: "all",
  });

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getFilterdBooks(category._id);
  }, [category]);

  const getFilterdBooks = async (categoryId) => {
    const { data } = await services.getBooksByCatgoryId(categoryId);
    setBooks(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <aside>
            <Category
              selectedCatgory={category?.label}
              setCategory={setCategory}
            />
          </aside>
        </div>
        <div className="col-8">
          <div className="row">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book?._id} className="col-4">
                  <Card object={book} />
                </div>
              ))
            ) : (
              <div className="alert alert-info">
                <h3 className="text-center">no books in this category</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
