import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostUrl } from "../api/urls";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { getAuthor } from "../services/authorsService";
import "../styles/AuthorPage.css";
import { capitalize, dateFormatter } from "../utils/utils";

export const AuthorPage = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState({});

  const retriveAuthor = async (authorId) => {
    const data = await getAuthor(authorId);
    console.log(data.data.data);
    setAuthor(data.data.data);
  };

  useEffect(() => {
    retriveAuthor(id);
  }, [id]);

  return (
    <div className="AuthorPage">
      <Navbar />
      <div className="author-content">
        <div className="row mt-5">
          <div className="col-md-4 justify-content-center">
            {author?.photo ? (
              <img
                className="author-img"
                src={`${hostUrl}${author?.photo}`}
                alt=""
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-md-6">
            {author?.firstName ? (
              <div>
                <h1>
                  {capitalize(author?.firstName)} {capitalize(author?.lastName)}
                </h1>
                <h6>{dateFormatter(author?.bDate)}</h6>
                <p>{author?.description}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
