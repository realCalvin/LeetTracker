import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// eslint-disable-next-line
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import ProtectedRoutes from "./ProtectedRoutes";
import NotProtectedRoutes from "./NotProtectedRoutes";

Amplify.configure(awsconfig);

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ProtectedRoutes} />
            <Route component={NotProtectedRoutes} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
