import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Register from "../components/Register";
import Home from "../pages/HomePage.jsx";
import Landing from "../pages/userLandingPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <PrivateRoute path="/landing">
          <Landing />
        </PrivateRoute>
        <Route path="/">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
