import reducers from './reducers';
import {createStore} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

export const createAppStore = () =>
    createStore(enableBatching(reducers), composeWithDevTools());

export default createAppStore();
