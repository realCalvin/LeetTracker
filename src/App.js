import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'
import awsconfig from './aws-exports';
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

Amplify.configure(awsconfig)

class App extends Component {
  render() {
    // Auth.currentAuthenticatedUser({
    //     bypassCache: false
    // }).then(user => console.log(user))
    // .catch(err => console.log(err));
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard}></Route>
            <Route exact path='/profile' component={Profile}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default withAuthenticator(App);
