import { useEffect, useState } from "react";
import { getCategories } from "../services/categoriesService";
import { capitalize } from "../utils/utils";

const Category = ({ onSetCategory, selectedCatgory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const {
        data: { data },
      } = await getCategories();
      setCategories(data);
    };
    getAllCategories();
  }, []);

  const handleCategoryChange = (category) => {
    if (category.label === selectedCatgory) return;

    // emit event to parent
    onSetCategory(category);
  };
  return (
    <ul className="list-group">
      <li
        onClick={() =>
          handleCategoryChange({
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
          onClick={() => handleCategoryChange(category)}
        >
          {capitalize(category?.label)}
        </li>
      ))}
    </ul>
  );
};

export default Category;
