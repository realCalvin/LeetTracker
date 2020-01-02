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
  // gets current user
  // componentDidMount() {
  //   Auth.currentSession().then(data => {
  //     let token = data.getIdToken();
  //     this.setState({
  //       userid: token.payload["cognito:username"]
  //     });
  //     console.log(token.payload);
  //   });
  // }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route exact path="/create" component={CreatePage}></Route>
            <Route exact path="/create/set" component={CreateSet}></Route>
            <Route exact path="/sets" component={ViewSets}></Route>
            <Route exact path="/view/set" component={ViewSet}></Route>
            <Route exact path="/profile" component={Profile}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default withAuthenticator(App);
