import React from 'react'

class Buttons extends React.Component {

  constructor() {
    super()
    this._startTimer = this._startTimer.bind(this)
    this._pauseTimer = this._pauseTimer.bind(this)
    this._clearTimer = this._clearTimer.bind(this)
  }

  _startTimer() {
    const p = this.props
    let activityType = p.activityType
    activityType = (activityType === 'p') ? p.pomodoroLength : p.breakLength
    const time = p.timer.time || activityType
    p.acts.startTimer(time)
    p.sounds.tick.play()
  }

  _pauseTimer() {
    const p = this.props
    let activityType = p.activityType
    activityType = (activityType === 'p') ? p.pomodoroLength : p.breakLength
    const time = p.timer.time || activityType
    p.stopTimeout()
    p.acts.pauseTimer(time)
    p.sounds.tick.pause()
  }

  _clearTimer() {
    const p = this.props
    p.stopTimeout()
    p.acts.clearTimer()
    p.sounds.tick.pause()
    p.sounds.alarm.pause()
    p.sounds.tick.currentTime = 0
    p.sounds.alarm.currentTime = 0
  }

  render() {
    const p = this.props
    const callback = p.disabled ? this._pauseTimer : this._startTimer
    const text = p.disabled ? 'Pause' : 'Start'

    return (
      <ul className="buttons">
        <li
          className={
          'is-button-active--' + p.timer.is_active +
          ' activity-type--' + p.activityType
          }
          >
          <button onClick={callback}>{text}</button>
        </li>
        <li>
          <button onClick={this._clearTimer}>Clear</button>
        </li>
      </ul>
    )
  }
}

export default Buttons
