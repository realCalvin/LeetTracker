import React from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";

const NotProtectedRoutes = () => {
  return (
    <Route>
      <Route exact path="/" component={Landing}></Route>
    </Route>
  );
};

export default NotProtectedRoutes;
