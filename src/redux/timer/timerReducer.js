// Functions
import { timeLinePercentageCalculator } from "../../helper/fucntions";

const initialState = {
  activeTimer: "pomodoro",
  isTimerFinished: false,
  isStarted: false,
  fullTime: 0,
  currentTime: 0,
  timeLinePercentage: 0,
};

const timerReducer = (state = initialState, action) => {

  const { isTimerFinished, fullTime, currentTime } = state;

  const { type, payload } = action

  switch (type) {
    case "SET_NEW_TIMER_CONFIGS":
      return {
        ...state,
        isStarted: false,
        activeTimer: payload.name,
        fullTime: payload.time,
        currentTime: payload.time,
        timeLinePercentage: "0%",
      };

    case "START_TIMER":
      // To avoid reseting the timer if the timer is'nt finished yet
      const time = isTimerFinished ? fullTime : currentTime
      return {
        ...state,
        isStarted: true,
        currentTime: time,
        isTimerFinished: false,
      };

    case "STOP_TIMER":
      return {
        ...state,
        isStarted: false,
      };


    case "UPDATE_CURRENT_TIME":
      return {
        ...state,
        currentTime: payload,
        ...timeLinePercentageCalculator(fullTime, payload),
      };

    case "TIMER_FINISH":
      return {
        ...state,
        currentTime: 0,
        isStarted: false,
        isTimerFinished: true,
      };

    default:
      return state;
  }
};

export default timerReducer;