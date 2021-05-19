import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Register from "../components/Register";
import Home from "../pages/HomePage";

export default function Router() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <Register setAuthenticated={setAuthenticated} />
        </Route>
        {authenticated ? (
          <Route path="/">
            <Home />
          </Route>
        ) : (
          <Redirect to="/register"></Redirect>
        )}
      </Switch>
    </BrowserRouter>
  );
}
