import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AuthorsPage from "../pages/AuthorsPage";
import BooksPage from "../pages/BooksPage";
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
        <Route path="/books">
          <BooksPage />
        </Route>
        <PrivateRoute path="/authors">
          <AuthorsPage />
        </PrivateRoute>
        <PrivateRoute path="/home">
          <Landing />
        </PrivateRoute>
        <Route path="/">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
