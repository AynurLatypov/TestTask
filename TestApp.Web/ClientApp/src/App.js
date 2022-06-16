import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Insert } from './components/Insert';
import { Preview } from './components/Present';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/values' component={Preview} />
            <Route path='/insert' component={Insert} />
      </Layout>
    );
  }
}
