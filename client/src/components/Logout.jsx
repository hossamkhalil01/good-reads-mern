import { Button } from "@material-ui/core";
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import { logout } from "../services/authService";

const Logout = (props) => {
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
    history.push("/home");
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="mt-5"
    >
      <Button variant="contained" color="primary" type="submit">
        Log Out
      </Button>
    </form>
  );
};

export default withRouter(Logout);
