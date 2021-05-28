import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostUrl } from "../api/urls";
import AvgRating from "../components/AvgRate";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import UserRating from "../components/UserRate";
import { getBook } from "../services/booksService";
import "../styles/BookPage.css";

export const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const retrieveBook = async (bookId) => {
    const data = await getBook(bookId);

    setBook(data.data.data);
  };
  useEffect(() => {
    retrieveBook(id);
  }, [id]);
  return (
    <div className="BookPage">
      <Navbar />
      <div className="row mt-5">
        <div className="col-md-4 justify-content-center">
          {book?.coverImage ? (
            <img src={`${hostUrl}${book?.coverImage}`} alt="" />
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6">
          {book?.title ? (
            <div>
              <h1>{book?.title}</h1>
              <h6>
                by {book?.authors[0].firstName} {book?.authors[0].lastName}
              </h6>
              <h6>{book?.categories[0].label}</h6>
              <AvgRating bookId={id} />
              <p>{book?.description}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 justify-content-center">
          <div className="rating-component mt-3">
            <UserRating bookId={id} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
