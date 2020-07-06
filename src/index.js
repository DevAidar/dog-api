import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/'>
        <Redirect to='/dog-api/' />
      </Route>
      <Route path='/dog-api/'>
        <App />
      </Route>
      <h1>404 Page Not Found</h1>
    </Switch>
  </BrowserRouter>, document.getElementById('root')
);