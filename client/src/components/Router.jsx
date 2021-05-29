import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import { AuthorPage } from "../pages/AuthorPage";
import AuthorsPage from "../pages/AuthorsPage";
import { BookPage } from "../pages/BookPage";
import BooksPage from "../pages/BooksPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import { SearchResult } from "../pages/SearchResultPage";
import AdminDashboard from "./admin/AdminDashboard";
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
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/books">
          <BooksPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/search/:key">
          <SearchResult />
        </Route>
        <Route path="/authors">
          <AuthorsPage />
        </Route>
        <Route path="/author/:id">
          <AuthorPage />
        </Route>
        <Route path="/book/:id">
          <BookPage />
        </Route>
        <Route path="/">
          <Redirect to="/home"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
