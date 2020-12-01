import React, { useEffect, useState } from 'react';
import './App.css';
import 'flexboxgrid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from './pages/home';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
