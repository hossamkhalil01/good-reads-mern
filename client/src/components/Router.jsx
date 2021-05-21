import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/HomePage.jsx";
import Registration from "../pages/Registration";
import Landing from "../pages/userLandingPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/registration">
          <Registration />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/landing">
          <Landing />
        </PrivateRoute>
        <Route path="/">
          <Redirect to="/landing"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
