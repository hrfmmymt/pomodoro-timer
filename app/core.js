/**
state = {
  breakLength:        (5min / 60000) [time in miliseconds]
  pomodoroLength:     (25min / 60000) [time in miliseconds]
  activityType:      'p'   [string] p/b
  timer:              object
    isActive:        false [bool]
    isFinished:      false [bool]
    paused:           false [bool]
    time:             (0) [time in miliseconds] || -1
}
 */
import React from 'react'
import {createStore, combineReducers} from 'redux'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import * as reducers from './reducers'
import App from './components/containers/app'

const store = createStore(
  combineReducers({
    breakLength: reducers.breakLength,
    pomodoroLength: reducers.pomodoroLength,
    isActive: reducers.isActive,
    activityType: reducers.activityType,
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
