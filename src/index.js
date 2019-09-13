
import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import App from './App'
import rootReducer from './reducers'
import * as serviceWorker from './serviceWorker';
import { loadState, saveState } from './localstorage';

export const history = createBrowserHistory()

const persistedState = loadState();

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]


if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )

  const store = createStore(
    connectRouter(history)(rootReducer),
    persistedState,
    composedEnhancers
  )

store.subscribe(() => {
    saveState({
        auth: store.getState().auth
    });
});

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)

serviceWorker.unregister();
