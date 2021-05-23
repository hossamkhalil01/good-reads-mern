import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";

const Category = ({ onSetCategory, selectedCatgory }) => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const getAllCategories = async () => {
      const { data: { data } } = await getCategories();
      setCategories(data);
    };
    getAllCategories();
  }, []);


  return (
    <ul className="list-group">
      <li
        onClick={() =>
          onSetCategory({
            label: "all",
          })
        }
        className={`list-group-item ${selectedCatgory === "all" ? "active" : ""
          }`}
      >
        All
      </li>
      {categories.map((category) => (
        <li
          key={category?._id}
          className={`list-group-item ${selectedCatgory === category?.label ? "active" : ""
            }`}
          onClick={() => onSetCategory(category)}
        >
          {category?.label}
        </li>
      ))}
    </ul>
  );
};

export default Category;
