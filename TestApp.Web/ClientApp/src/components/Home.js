import React, { Component } from 'react';
import { Link } from 'react-router-dom'
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
            <h1>Hello, it's a test task!</h1>
            <p>You can see current values <Link to="/values">here</Link></p>
            <p>You can change current values <Link to="/insert">here</Link></p>
      </div>
    );
  }
}
