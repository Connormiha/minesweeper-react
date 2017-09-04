import reducers from './reducers';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {enableBatching} from 'redux-batched-actions';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

export const createAppStore = () =>
    createStore(enableBatching(reducers), composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    ));

export default createAppStore();
