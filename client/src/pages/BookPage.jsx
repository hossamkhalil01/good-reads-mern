import { useParams } from "react-router";

export const BookPage = () => {
  const { id } = useParams();
  return <h2>Book With Id {id} </h2>;
};
