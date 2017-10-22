// @flow

import './style.styl';

import React from 'react';
import {render} from 'react-dom';
import store from 'store';
import {Provider} from 'react-redux';
import routes from 'routes';

render(
    (
        <Provider store={store}>
            {routes}
        </Provider>
    ),
    (document.querySelector('#app'): any),
);
