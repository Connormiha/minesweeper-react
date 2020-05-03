import reducers from './reducers';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createAppStore = () =>
  createStore(reducers, composeWithDevTools());

export default createAppStore();
