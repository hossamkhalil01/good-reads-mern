import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

function PrivateRoute(props) {
  const { component: Component, ...rest } = props;
  let user = localStorage.getItem("user");

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } //redirect if there is no user
  return (
    <Redirect to={{ pathname: "/home", state: { referer: props.location } }} />
  );
}

export default withRouter(PrivateRoute);
