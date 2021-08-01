import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signup from './components/signup';
import Login from './components/login';

function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
