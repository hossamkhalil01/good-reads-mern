import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Footer from "../components/layouts/Footer";
import Navbar from "../components/layouts/Navbar";
import { getBook } from "../services/booksService";

export const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const retrieveBook = async (bookId) => {
    // const {
    //   data: {
    //     data: { docs },
    //   },
    // } = await getBook({ categoryId });
    // setBooks(docs);
    const data = await getBook(bookId);
    console.log(data.data.data);
    setBook(data.data.data);
  };
  useEffect(() => {
    retrieveBook(id);
  }, [id]);
  return (
    <div>
      <Navbar />
      <Grid container alignItems="flex-start" justify="center">
        <h2>Book With Id {id} </h2>
      </Grid>
      <Footer />
    </div>
  );
};
