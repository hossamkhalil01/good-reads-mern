import { useEffect, useState } from "react";
import {getCategories} from "../services/categoriesService";

const Category = ({ setCategory, selectedCatgory }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const { data } = await getCategories();
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
