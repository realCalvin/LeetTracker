import React, { Component } from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom'
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <h1>Profile</h1>
      </div>
    )
  }
}
export default Profile;
