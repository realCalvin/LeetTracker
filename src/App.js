import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
            {/* User does not need to be logged in */}
            <Route component={NotProtectedRoutes} />
            {/* User needs to be logged in */}
            <Route component={ProtectedRoutes} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
