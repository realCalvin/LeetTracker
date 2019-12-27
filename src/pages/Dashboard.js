import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom'
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'

class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
      </div>
    )
  }
}
export default Dashboard;
