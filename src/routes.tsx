import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PageEntry from 'components/page/Entry';

const ROOT_URL_ROUTER = process.env.ROOT_URL;

export default (
  <Router basename={`/${ROOT_URL_ROUTER}`}>
    <Switch>
      <Route
        path="/"
        exact
        component={PageEntry}
      />
    </Switch>
  </Router>
);
