import React, { Components } from 'react';
import { Auth } from 'aws-amplify';
import style from 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import { Link }from 'react-router-dom'

const NavbarC = () => {
    // Function to log out current user
    const logOut = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
    return (
        // Navbar that displays on every page
        <div id="Navbar">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">LeetCode</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/">Home</Link>
                    <Link to="/profile">Profile</Link>
                </Nav>
                <Nav>
                    <Nav.Link onClick={logOut}>Logout</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavbarC 