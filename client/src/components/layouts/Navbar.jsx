import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../services/categoriesService";
import { imageBase } from "../../utils/urls";
import Logout from "../Logout";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  let user = localStorage.getItem("user");

  useEffect(() => {
    const getAllCategories = async () => {
      const {
        data: { data },
      } = await getCategories({ limit: 5 });
      setCategories(data);
    };
    getAllCategories();
  }, []);

  return (
    <header id="header" className="sticky-top">
      <div className="container d-flex align-items-center">
        <div className=" me-auto">
          <h1>
            <NavLink activeClassName="active" className="logo" to="/home" exact>
              <img
                src={`${imageBase}img/logo.png`}
                alt=""
                className="img-fluid"
              />
              GoodReads
            </NavLink>
          </h1>
        </div>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <NavLink activeClassName="active" to="/home" exact>
                Home
              </NavLink>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Categories</span> <i className="bi bi-chevron-down"></i>
              </a>
              <ul>
                {categories.map((category) => (
                  <li key={category._id}>
                    {" "}
                    <NavLink
                      activeClassName=""
                      to={{ pathname: "/books", category: category }}
                    >
                      {category.label}{" "}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <NavLink activeClassName="active" to="/books" exact>
                Books
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/authors" exact>
                Authors
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/" exact>
                Contact
              </NavLink>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
        {!user ? (
          <div className="ms-auto d-flex">
            <NavLink className="login-link fs-6" to="/login" exact>
              Login
            </NavLink>

            <NavLink className="register-btn" to="/registration">
              Register
            </NavLink>
          </div>
        ) : (
          <div className="ms-auto d-flex">
            <Logout />
          </div>
        )}
      </div>
    </header>
  );
}
