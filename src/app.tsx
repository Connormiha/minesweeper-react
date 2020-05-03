import './style.styl';

import React from 'react';
import {render} from 'react-dom';
import store from 'store';
import {Provider} from 'react-redux';

import PageEntry from 'components/page/Entry';

render(
  (
    <Provider store={store}>
      <PageEntry />
    </Provider>
  ),
  document.querySelector('#app'),
);
