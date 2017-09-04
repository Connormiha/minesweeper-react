import React from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PageEntry from 'components/page/Entry';

export default (
    <Router>
        <Switch>
            <Route path="/" exact component={PageEntry} />
        </Switch>
    </Router>
);
