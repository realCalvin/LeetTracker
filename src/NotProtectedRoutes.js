import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import CreatePage from "./pages/CreatePage";
import CreateSet from "./pages/CreateSet";
import ViewSets from "./pages/ViewSets";
import ViewSet from "./pages/ViewSet";

import { withAuthenticator } from "aws-amplify-react";

const NotProtectedRoutes = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/create" component={CreatePage}></Route>
      <Route exact path="/create/set" component={CreateSet}></Route>
      <Route exact path="/sets" component={ViewSets}></Route>
      <Route exact path="/view/set" component={ViewSet}></Route>
      <Route exact path="/profile" component={Profile}></Route>
    </div>
  );
};

export default withAuthenticator(NotProtectedRoutes);
