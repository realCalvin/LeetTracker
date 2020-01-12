import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import CreatePage from "./pages/CreatePage";
import CreateSet from "./pages/CreateSet";
import ViewSets from "./pages/ViewSets";
import ViewSet from "./pages/ViewSet";
import ViewSetId from "./pages/VietSetId";

import { withAuthenticator } from "aws-amplify-react";
const ProtectedRoutes = () => {
  return (
    <Route>
      <Navbar />
      <Route exact path="/create" component={CreatePage}></Route>
      <Route exact path="/create/set" component={CreateSet}></Route>
      <Route exact path="/sets" component={ViewSets}></Route>
      <Route exact path="/view/set" component={ViewSet}></Route>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/view/set/:id" component={ViewSetId}></Route>
    </Route>
  );
};

export default withAuthenticator(ProtectedRoutes);
