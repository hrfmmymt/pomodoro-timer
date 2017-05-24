/**
state = {
  length:             (25min / 60000) [time in miliseconds]
  is_active:          false [bool]
  activity_type:      'p'   [string] p/b
  timer:              (25min / 60000) [time in miliseconds] || -1
}
 */

import { createStore, combineReducers } from 'redux'
import * as reducers from './reducers'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

const store = createStore(
  combineReducers({
    length: reducers.length,
    is_active: reducers.is_active,
    activity_type: reducers.activity_type,
    timer: reducers.timer
  })
)

const run = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById('app')
  )
}

run()
store.subscribe(run)

window.store = store
