import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { user } from "../services/authService";

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } //redirect if there is no user
  return <Redirect to="/home" />;
}

export default withRouter(PrivateRoute);
