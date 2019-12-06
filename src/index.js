/* global chrome */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import 'bulma/css/bulma.min.css';
import 'bulma-checkradio/dist/css/bulma-checkradio.min.css';
import { hideSettingsModal, hideResetModal } from './actions';
import App from './components/App';
import './index.css';

const store = new Store();

async function renderApp() {
  await store.ready();
  await store.dispatch(hideSettingsModal());
  await store.dispatch(hideResetModal());

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

chrome.runtime.sendMessage({ type: 'READY' }, renderApp);
