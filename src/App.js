import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'
import awsconfig from './aws-exports';
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import CreateSet from './pages/CreateSet'

Amplify.configure(awsconfig)



class App extends Component {

  // gets current user
  // componentDidMount(){
  //   Auth.currentSession()
  //   .then(data => {
  //     let token = data.getIdToken();
  //     this.setState({
  //       userid: token.payload["cognito:username"]
  //     })
  //   })
  // }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard}></Route>
            <Route exact path='/create' component={CreateSet}></Route>
            <Route exact path='/profile' component={Profile}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default withAuthenticator(App);
