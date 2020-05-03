import * as actions from 'flux/game';
import {createAppStore} from 'store';

const STORE_ID = 'game';

let store;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getState = () =>
  store.getState()[STORE_ID];

describe('Flux game', () => {
  beforeEach(() => {
    store = createAppStore();
  });

  it('should start', () => {
    store.dispatch(actions.start());
    expect(getState().state).toBe('in-progress');
  });
});
