import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CreatePage from "./pages/CreatePage";
import CreateSet from "./pages/CreateSet";
import UpdateSet from "./pages/UpdateSet";
import ViewSets from "./pages/ViewSets";
import ViewSet from "./pages/ViewSet";
import ViewSetId from "./pages/VietSetId";
import Error from "./pages/Error";
import { Auth } from "aws-amplify";
import AuthenticatedRoute from "./components/Route/AuthenticatedRoute";

Amplify.configure(awsconfig);
const browserHistory = createBrowserHistory();

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
    // eslint-disable-next-line
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    console.log(isAuthenticating);
    setIsAuthenticating(!isAuthenticating);
  }

  return (
    !isAuthenticating && (
      <div className="App">
        <Router history={browserHistory}>
          <Switch>
            {/* User does not need to be logged in */}
            <Route exact path="/" component={Landing}></Route>
            {/* User needs to be logged in */}
            <AuthenticatedRoute
              path="/create"
              exact
              component={CreatePage}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <AuthenticatedRoute
              path="/dashboard"
              exact
              component={Dashboard}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <AuthenticatedRoute
              path="/create/set"
              exact
              component={CreateSet}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <AuthenticatedRoute
              path="/update/set"
              exact
              component={UpdateSet}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <AuthenticatedRoute
              path="/sets"
              exact
              component={ViewSets}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <AuthenticatedRoute
              path="/view/set"
              exact
              component={ViewSet}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <AuthenticatedRoute
              path="/:user/:id"
              exact
              component={ViewSetId}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <AuthenticatedRoute
              path="/view/:id"
              exact
              component={ViewSetId}
              appProps={{ isAuthenticated, userHasAuthenticated }}
            />
            <Route path="/*" component={Error} />
          </Switch>
        </Router>
      </div>
    )
  );
}

export default App;
