export const breakLength = (state = (5 * 60000), action) => {
  switch (action.type) {
    case 'SET_BREAK_LENGTH': return action.length
    default: return state
  }
}

export const pomodoroLength = (state = (25 * 60000), action) => {
  switch (action.type) {
    case 'SET_POMODORO_LENGTH': return action.length
    default: return state
  }
}

export const activityType = (state = 'p', action) => {
  switch (action.type) {
    case 'SET_ACTIVITY_TYPE': return action.activityType
    default: return state
  }
}

const timerInitState = {
  isActive: false,
  isFinished: false,
  paused: false,
  time: 0
}

export const timer = (state = timerInitState, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return {
        isActive: action.timer.isActive,
        isFinished: action.timer.isFinished,
        paused: state.paused,
        time: Number(action.timer.time)
      }
    case 'PAUSE_TIMER':
      return {
        isActive: action.timer.isActive,
        paused: action.timer.paused,
        isFinished: state.isFinished,
        time: Number(action.timer.time)
      }
    case 'TICK_TIMER':
      return {
        isActive: state.isActive,
        paused: state.paused,
        isFinished: state.isFinished,
        time: Number(action.timer.time)
      }
    case 'CLEAR_TIMER':
      return {
        isActive: false,
        paused: false,
        isFinished: false,
        time: 0
      }
    case 'FINISH_TIMER':
      return {
        isActive: false,
        paused: false,
        isFinished: true,
        time: Number(action.timer.time)
      }
    default:
      return state
  }
}
