/**
state = {
  length:             (25min / 60000) [time in miliseconds]
  activity_type:      'p'   [string] p/b
  timer:              object
    is_active:        false [bool]
    was_started:      false [bool]
    is_finished:      false [bool]
    time:             (25min / 60000) [time in miliseconds] || -1
}
 */
import React from 'react'
import {createStore, combineReducers} from 'redux'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import * as reducers from './reducers'
import App from './components/containers/App'

const store = createStore(
  combineReducers({
    breakLength: reducers.breakLength,
    pomodoroLength: reducers.pomodoroLength,
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

// *** DEBUG *** //
window.store = store
