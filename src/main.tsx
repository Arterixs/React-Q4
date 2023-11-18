import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { App } from 'app';
import { ErrorBoundary } from 'app/error-boundary';

import { store } from './store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
      </ErrorBoundary>
    </HashRouter>
  </React.StrictMode>
);
