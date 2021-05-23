import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AuthorsPage from "../pages/AuthorsPage";
import Categories from "../pages/CategoriesPage";
import Home from "../pages/HomePage.jsx";
import Landing from "../pages/LandingPage";
import RegistrationPage from "../pages/RegistrationPage";
import AdminDashboard from "./admin/AdminDashboard";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/admin/dashboard" exact  >
          <AdminDashboard />
        </PrivateRoute>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <Route path="/categories">
          <Categories />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/authors">
          <AuthorsPage />
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
