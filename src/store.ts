import reducers from './reducers';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

export const createAppStore = () =>
  createStore(reducers, composeWithDevTools());

export default createAppStore();
