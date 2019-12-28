import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { Row, Col, InputGroup, FormControl, Button, Card } from 'react-bootstrap';
import data from '../data.json';
import '../index.css';

class CreateSet extends Component {
state = {
    problems: data
}
  render() {
    let updateSearch = (e) => {
        console.log(e.target.value)
        let newProblems = [];
        data.filter(problem => {
            let title = problem.title.toLowerCase()
            if(title.includes(e.target.value.toLowerCase())){
                newProblems.push(problem)
            }
        })
        this.setState({
            problems: newProblems
        })
    }
    let checkLevel = (level) => {
        if(level == 1) {
            return "Easy"
        }
        else if(level == 2) {
            return "Medium"
        }
        else {
            return "Hard"
        }
    }
    let filteredProblems = this.state.problems.map(problem => (
        <Card bg="light" style={{ width: '18rem' }} key={problem.id} id={problem.id}>
            <Card.Header>{checkLevel(problem.level)}</Card.Header>
            <Card.Body>
            <Card.Text>
                <a href={'https://leetcode.com/problems/'+problem.url}>{problem.title}</a>
            </Card.Text>
            </Card.Body>
        </Card>
    ))
    
    return (
      <div className="CreateSet">
        <Row className="justify-content-md-center">
            <h1>Create Set</h1>
        </Row>
        <Row className="justify-content-md-center">
            <InputGroup className="mb-3">
                <FormControl onChange={updateSearch}/>
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={updateSearch}>Search</Button>
                </InputGroup.Append>
            </InputGroup>
        </Row>
        <Row id="card-row">
            {filteredProblems}
        </Row>
      </div>
    )
  }
}
export default CreateSet;
