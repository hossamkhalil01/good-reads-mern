import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "../../services/categoriesService";


export default function Navbar() {

    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getAllCategories = async () => {
            const { data: { data } } = await getCategories({limit: 5});
            setCategories(data);
        };
        getAllCategories();
    }, []);  
    
    return (
        <header id="header" className="sticky-top">
            <div className="container d-flex align-items-center">

                <div className=" me-auto">
                    <h1><a className="logo" href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid" /> GoodReads</a></h1>
                </div>
                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                        <li><NavLink
                            activeClassName="active"
                            to="/home"
                            exact
                        >
                            Home</NavLink>
                        </li>
                        <li className="dropdown"><a href="#"><span>Categories</span> <i className="bi bi-chevron-down"></i></a>
                            <ul>
                                {categories.map(category => <li key={category._id}> <NavLink  activeClassName=""
                                                            to={{pathname: "/books" , category:category}} >{category.label} </NavLink></li>)}
                            </ul>
                        </li>
                        <li><NavLink
                            activeClassName="active"
                            to="/books"
                            exact
                        >Books
            </NavLink>
                        </li>
                        <li><NavLink
                            activeClassName="active"
                            to="/authors"
                            exact>Authors
            </NavLink>
                        </li>
                        <li><NavLink
                            activeClassName="active"
                            to="/"
                            exact>Contact
            </NavLink></li>

                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

                <div className="ms-auto d-flex">
                    <NavLink
                        className="login-link fs-6"
                        to="/registration"
                        exact>Login
                        
                    </NavLink>

                    <NavLink  className="register-btn" 
                     to="/registration" >
                        Register
                    </NavLink>
                </div>
            </div>
        </header >
    );
}