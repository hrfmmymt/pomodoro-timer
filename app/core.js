import { createStore, combineReducers } from 'redux'
import * as reducers from './reducers'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import App from './components/App'

const store = createStore(
  combineReducers({
  })
);

const run = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('app')
  )
}

run()
store.subscribe(run);

// *** DEBUG *** //
window.store = store
