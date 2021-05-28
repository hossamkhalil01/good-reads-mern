import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { hostUrl } from "../api/urls";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { getAuthors } from "../services/authorsService";
import { getBooks } from "../services/booksService";
import {
  parsePaginatedResponse
} from "../utils/pagination";



export default function HomePage() {

  const [popularAuthors, setPopularAuthors] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {

    const getAuthorsData = async () => {
      // get the new page from api
      const { data } = parsePaginatedResponse(
        await getAuthors()
      );
      setPopularAuthors(data.splice(0, 3));
    };

    const getBooksData = async () => {
      // get the new page from api
      const { data } = parsePaginatedResponse(
        await getBooks()
      );
      setPopularBooks(data.splice(0, 3));
    };

    getAuthorsData();
    getBooksData();

  }, [])

  return (
    // <Grid container alignItems="flex-start" justify="center" spacing={2}>
    //   <h1>landing</h1>
    //   <Logout />
    // </Grid>
    <div>
      <Navbar />
      <div className="main-content">
        <section id="hero" className="d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: "url(/assets/img/hero-bg.jpg)",
            backgroundPosition: "top center",
            width: "100%",
            height: "80vh",
            backgroundSize: "cover",
            position: "relative"
          }}
        >

          <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
            <h1>Learning Today,<br />Leading Tomorrow</h1>
            <h2>We are team of talented designers making websites with Bootstrap</h2>
            <a href="courses.html" className="btn-get-started">Get Started</a>
          </div>
        </section >

        <section id="popular-courses" className="courses">
          <div className="container" data-aos="fade-up">

            <div className="section-title">
              <h2>Books</h2>
              <p>Popular Books</p>
            </div>

            <div className="row" data-aos="zoom-in" data-aos-delay="100">
              {
                popularBooks.map((book) => {
                  return (
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch" key={book._id}>
                      <div className="course-item">
                        <img src={`${hostUrl}${book.coverImage}`} className="img-fluid" alt="..." />
                        <div className="course-content">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>{book.categories[0].label}</h4>
                          </div>

                          <h3><NavLink activeClassName="active"
                            to={`/book/${book._id}`}
                            exact>
                            {book.title}
                          </NavLink></h3>
                          <p>{book.description}</p>
                          <div className="trainer d-flex justify-content-between align-items-center">
                            <div className="trainer-profile d-flex align-items-center">
                              <img src={`${hostUrl}${book.authors[0].photo}`} className="img-fluid" alt="" />
                              <NavLink activeClassName="active"
                                to={`/author/${book.authors[0]._id}`}
                                exact>
                                <span>{book.authors[0].firstName + ' ' + book.authors[0].lastName} </span>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
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
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img src="assets/img/trainers/trainer-1.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>Walter White</h4>
                    <span>Web Development</span>
                    <p>
                      Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
                    </p>
                    <div className="social">
                      <a href=""><i className="bi bi-twitter"></i></a>
                      <a href=""><i className="bi bi-facebook"></i></a>
                      <a href=""><i className="bi bi-instagram"></i></a>
                      <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img src="assets/img/trainers/trainer-2.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>Sarah Jhinson</h4>
                    <span>Marketing</span>
                    <p>
                      Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus
                    </p>
                    <div className="social">
                      <a href=""><i className="bi bi-twitter"></i></a>
                      <a href=""><i className="bi bi-facebook"></i></a>
                      <a href=""><i className="bi bi-instagram"></i></a>
                      <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="member">
                  <img src="assets/img/trainers/trainer-3.jpg" className="img-fluid" alt="" />
                  <div className="member-content">
                    <h4>William Anderson</h4>
                    <span>Content</span>
                    <p>
                      Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara
                    </p>
                    <div className="social">
                      <a href=""><i className="bi bi-twitter"></i></a>
                      <a href=""><i className="bi bi-facebook"></i></a>
                      <a href=""><i className="bi bi-instagram"></i></a>
                      <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div >
      <Footer />
    </div >

  );
}
