import { useEffect, useState } from "react";
import services from "../services/categoriesService";

const Category = ({ setCategory, selectedCatgory }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const { data } = await services.getCategories();
    setCategories(data);
  };
  return (
    <ul className="list-group">
      <li
        onClick={() =>
          setCategory({
            _id: "1",
            label: "all",
          })
        }
        className={`list-group-item ${
          selectedCatgory === "all" ? "active" : ""
        }`}
      >
        All
      </li>
      {categories.map((category) => (
        <li
          key={category?._id}
          className={`list-group-item ${
            selectedCatgory === category?.label ? "active" : ""
          }`}
          onClick={() => setCategory(category)}
        >
          {category?.label}
        </li>
      ))}
    </ul>
  );
};

export default Category;
