import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// eslint-disable-next-line
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import awsconfig from "./aws-exports";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreatePage from "./pages/CreatePage";
import CreateSet from "./pages/CreateSet";
import ViewSets from "./pages/ViewSets";
import ViewSet from "./pages/ViewSet";

Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={NoNavbarContainer} />
            <Route component={NavbarContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const NoNavbarContainer = () => {
  return (
    <div>
      {/* <Navbar />  */}
      <Route exact path="/" component={Dashboard}></Route>
    </div>
  );
};
const NavbarContainer = () => {
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

export default withAuthenticator(App);
