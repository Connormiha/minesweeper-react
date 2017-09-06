// @flow

import './style.styl';

import {render} from 'react-dom';
import store from 'store';
import {Provider} from 'react-redux';
import routes from 'routes';

// Redux
// import * as gameActions from 'flux/game';
//
// store.dispatch(gameActions.init(Object.keys(games)));

render(
    (
        <Provider store={store}>
            {routes}
        </Provider>
    ),
    document.querySelector('#app')
);
