import React from "react";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";

const ProtectedRoutes = () => {
  return (
    <div>
      <Route exact path="/" component={Landing}></Route>
    </div>
  );
};

export default ProtectedRoutes;
