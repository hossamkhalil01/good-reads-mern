import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Categories from "../pages/CategoriesPage";
import Home from "../pages/HomePage.jsx";
import Landing from "../pages/LandingPage";
import RegistrationPage from "../pages/RegistrationPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <Route path="/categories">
          <Categories />
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
