import React, { Component } from 'react';
// import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import Weather from './containers/Weather';
import City from './components/City';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Weather/>
          {/* <Route exact path='/' component={Weather}/> */}
          <Route
            path="/city/:name"
            component={City}
          />
        </div>
      </Router>
    );
  }
}

export default App;
