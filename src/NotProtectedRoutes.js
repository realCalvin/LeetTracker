import React from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const NotProtectedRoutes = () => {
  return (
    <Route>
      <Route exact path="/" component={Landing}></Route>
      <Route exact path="/login" component={SignIn}></Route>
      <Route exact path="/register" component={SignUp}></Route>
    </Route>
  );
};

export default NotProtectedRoutes;
