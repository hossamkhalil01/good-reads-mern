import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { checkTokenValid } from "../services/authService";
function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  checkTokenValid();
  let user = localStorage.getItem("user");

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } //redirect if there is no user
  return (
    <Redirect
      to={{ pathname: "/login", state: { referer: props.location } }}
    />
  );
}

export default withRouter(PrivateRoute);
