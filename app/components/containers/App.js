import React from 'react'
import {connect} from 'react-redux'
import {
  setPomodoroLength,
  setBreakLength,
  setActivityType,
  startTimer,
  tickTimer,
  pauseTimer,
  clearTimer,
  finishTimer
} from '../../actions'
import Controls from '../presentationals/controls'
import Clock from '../presentationals/clock'

import Styles from '../../styles/app.css'

const mapStateToProps = state => ({
  pomodoroLength: state.pomodoroLength,
  breakLength: state.breakLength,
  activityType: state.activityType,
  timer: state.timer
})

const mapDispatchToProps = dispatch => ({
  setBreakLength: l => dispatch(setBreakLength(l)),
  setActivityType: t => dispatch(setActivityType(t)),
  setPomodoroLength: l => dispatch(setPomodoroLength(l)),
  startTimer: t => dispatch(startTimer(t)),
  tickTimer: t => dispatch(tickTimer(t)),
  pauseTimer: t => dispatch(pauseTimer(t)),
  clearTimer: () => dispatch(clearTimer()),
  finishTimer: () => dispatch(finishTimer())
})

class App extends React.Component {

  constructor(props) {
    super(props)
    this.ONE_SEC = 1000
    this.counter
    this.timeout

    this.stopTimeout = this.stopTimeout.bind(this)

    this.tickSound = new Audio('../assets/sounds/Tick-tock-sound.mp3')
    this.alarmSound = new Audio('../assets/sounds/Alarm-clock-sound-short.mp3')
    this.tickSound.addEventListener('ended', function () {
      this.currentTime = 0
      this.play()
    }, false)
  }

  stopTimeout() {
    clearTimeout(this.timeout)
  }

  componentDidUpdate() {
    const t = this
    const p = this.props
    const timer = this.props.timer
    const length = (p.activityType === 'p') ? p.breakLength : p.pomodoroLength

    const startTimeout = () => {
      t.timeout = setTimeout(() => {
        t.counter -= t.ONE_SEC
        if (t.counter === 0) {
          const type = (p.activityType === 'p') ? 'b' : 'p'
          p.finishTimer()
          p.setActivityType(type)
          t.tickSound.pause()
          t.tickSound.currentTime = 0
          t.alarmSound.play()
        } else {
          p.tickTimer(t.counter)
        }
      }, t.ONE_SEC)
    }

    if (p.timer.is_finished) {
      p.clearTimer()
      setTimeout(() => {
        t.tickSound.play()
        p.startTimer(length)
      }, t.ONE_SEC)
    }

    if (timer.is_active) {
      const length = (p.activityType === 'p') ? p.pomodoroLength : p.breakLength
      this.counter = (timer.time === 0) ? length : timer.time
      if (this.counter !== 0) {
        startTimeout()
      }
    }
  }

  render() {
    const p = this.props
    const humanTime = (p.activityType === 'b') ? p.breakLength : p.pomodoroLength
    return (
      <div>
        <Controls
          timer={p.timer}
          pomodoroLength={p.pomodoroLength}
          breakLength={p.breakLength}
          activityType={p.activityType}
          stopTimeout={this.stopTimeout}
          acts={{
            setActivityType: p.setActivityType,
            setBreakLength: p.setBreakLength,
            setPomodoroLength: p.setPomodoroLength,
            startTimer: p.startTimer,
            pauseTimer: p.pauseTimer,
            clearTimer: p.clearTimer
          }}
          sounds={{
            tick: this.tickSound,
            alarm: this.alarmSound
          }}
          />
        <Clock timer={p.timer} type={p.activityType} act={p.setActivityType}>
          {humanTime}
        </Clock>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
