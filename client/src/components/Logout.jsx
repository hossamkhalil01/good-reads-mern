import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { logout } from "../services/authService";
import "../styles/Logout.css";

const Logout = (props) => {
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    history.push("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="Logout">
      {/* <Button variant="contained" color="primary" type="submit">
        Log Out
      </Button> */}
      <button type="submit" className="logout-btn">
        Log Out
      </button>
    </form>
  );
};

export default withRouter(Logout);
