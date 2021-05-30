import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../services/categoriesService";
import { imageBase } from "../../utils/urls";
import { capitalize } from "../../utils/utils";
import Logout from "../Logout";
import { currentUser } from "../../services/authService";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(0);
  let user = localStorage.getItem("user");
  
 
  

  useEffect(() => {
    if(currentUser){
      setUserId(JSON.parse(localStorage.getItem("user"))._id);
   }
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

            {/* Show shelf for logged in user */}
            {user ? (<li><NavLink activeClassName="active" to="/shelf" exact>
              My Shelf
            </NavLink> </li>) : ''}

            <li className="dropdown">
              <a href="#">
                <span>Categories</span> <i className="bi bi-chevron-down"></i>
              </a>
              <ul>
                {categories.map((category) => (
                  <li key={category._id}>
                    <NavLink
                      activeClassName=""
                      to={{ pathname: "/books", category: category }}
                    >
                      {capitalize(category.label)}
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
            <li>
              <NavLink activeClassName="active" to={`/user/${userId}`} exact>
                Profile
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
    </header >
  );
        
}
