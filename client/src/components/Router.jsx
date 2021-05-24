import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AuthorsPage from "../pages/AuthorsPage";
import Categories from "../pages/CategoriesPage";
import Home from "../pages/HomePage.jsx";
import Landing from "../pages/LandingPage";
import RegistrationPage from "../pages/RegistrationPage";
import AdminDashboard from "./admin/AdminDashboard";
import { SearchResult } from "../pages/SearchResultPage";
import { AuthorPage } from "../pages/AuthorPage";
import { BookPage } from "../pages/BookPage";
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/admin/dashboard" exact>
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
        <PrivateRoute path="/search/:key">
          <SearchResult />
        </PrivateRoute>
        <PrivateRoute path="/authors">
          <AuthorsPage />
        </PrivateRoute>
        <PrivateRoute path="/author/:id">
          <AuthorPage />
        </PrivateRoute>
        <PrivateRoute path="/book/:id">
          <BookPage />
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
