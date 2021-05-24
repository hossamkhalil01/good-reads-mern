import { useParams } from "react-router";

export const AuthorPage = () => {
  const { id } = useParams();
  return <h2>Author With Id {id} </h2>;
};
