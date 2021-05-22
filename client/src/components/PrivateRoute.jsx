import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { checkTokenValid,currentUser } from "../services/authService";
function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  checkTokenValid();

  if (currentUser) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } //redirect if there is no user
  return (
    <Redirect
      to={{ pathname: "/registration", state: { referer: props.location } }}
    />
  );
}

export default withRouter(PrivateRoute);
