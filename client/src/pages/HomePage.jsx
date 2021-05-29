import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { hostUrl } from "../api/urls";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { getAuthors } from "../services/authorsService";
import { getBooks } from "../services/booksService";
import { parsePaginatedResponse } from "../utils/pagination";
import { capitalize } from "../utils/utils";

export default function HomePage() {
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const getAuthorsData = async () => {
      // get the new page from api
      const { data } = parsePaginatedResponse(await getAuthors());
      setPopularAuthors(data.splice(0, 3));
    };

    const getBooksData = async () => {
      // get the new page from api
      const { data } = parsePaginatedResponse(await getBooks());
      setPopularBooks(data.splice(0, 3));
    };

    getAuthorsData();
    getBooksData();
  }, []);

  return (

    <div>
      <Navbar />
      <div className="main-content">
        <section
          id="hero"
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: "url(/assets/img/hero-bg.jpg)",
            backgroundPosition: "top center",
            width: "100%",
            height: "80vh",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <div
            className="container position-relative"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <h1>
              A reader lives a thousand lives
              <br />
              before he dies
            </h1>
            <h2>The man who never reads lives only once.</h2>
            <NavLink
              activeClassName="active"
              className="btn-get-started"
              to="/books"
              exact
            >
              Find a Book
            </NavLink>
          </div>
        </section>

        <section id="popular-courses" className="courses">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Books</h2>
              <p>Popular Books</p>
            </div>

            <div className="row" data-aos="zoom-in" data-aos-delay="100">
              {popularBooks.map((book) => {
                return (
                  <div
                    className="col-lg-4 col-md-6 d-flex align-items-stretch"
                    key={book._id}
                  >
                    <div className="course-item">
                      <img
                        src={`${hostUrl}${book.coverImage}`}
                        className="img-fluid"
                        alt="..."
                      />
                      <div className="course-content">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4>{capitalize(book.categories[0].label)}</h4>
                        </div>

                        <h3>
                          <NavLink
                            activeClassName="active"
                            to={`/book/${book._id}`}
                            exact
                          >
                            {capitalize(book.title)}
                          </NavLink>
                        </h3>
                        <p>{book.description}</p>
                        <div className="trainer d-flex justify-content-between align-items-center">
                          <div className="trainer-profile d-flex align-items-center">
                            <img
                              src={`${hostUrl}${book.authors[0].photo}`}
                              className="img-fluid"
                              alt=""
                            />
                            <NavLink
                              activeClassName="active"
                              to={`/author/${book.authors[0]._id}`}
                              exact
                            >
                              <span>
                                {capitalize(book.authors[0].firstName) +
                                  " " +
                                  capitalize(book.authors[0].lastName)}{" "}
                              </span>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="trainers" className="trainers">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Authors</h2>
              <p>Popular Authors</p>
            </div>
            <div className="row" data-aos="zoom-in" data-aos-delay="100">
              {popularAuthors.map((author) => {
                return (
                  <div
                    className="col-lg-4 col-md-6 d-flex align-items-stretch"
                    key={author._id}
                  >
                    <div className="member">
                      <img
                        src={`${hostUrl}${author.photo}`}
                        className="img-fluid"
                        alt=""
                      />
                      <div className="member-content">
                        <h4>
                          <NavLink
                            activeClassName="active"
                            className="author-name"
                            to={`/author/${author._id}`}
                            exact
                          >
                            {`${capitalize(author.firstName)} ${capitalize(
                              author.lastName
                            )}`}
                          </NavLink>
                        </h4>

                        <p>{author.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
