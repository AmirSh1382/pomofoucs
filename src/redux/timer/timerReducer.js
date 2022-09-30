// Functions
import { timeLinePercentageCalculator, clockFormatGenerator } from "../../helper/fucntions";
import { getSettingFromLocalStorage, setSettingToLocalStorage } from "../../helper/fucntions";

const initialState = {
  setting: {
    isThereLocalSetting: false,
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
    darkMode: false,
    alarmAudio: "crystal",
  },
  time: {
    activeTimer: "",
    isTimerFinished: false,
    isStarted: false,
    fullTime: 0,
    currentTime: 0,
    timeLinePercentage: 0,
  },
};

const timerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  const { isTimerFinished, fullTime, currentTime, timeLinePercentage } = state.time;

  switch (type) {
    case "SET_NEW_TIMER_CONFIGS":
      document.title = `${clockFormatGenerator(payload.time)}-Time to focus!`
      return {
        setting: {
          ...state.setting,
        },
        time: {
          ...state.time,
          isTimerFinished: false,
          isStarted: false,
          activeTimer: payload.name,
          fullTime: payload.time,
          currentTime: payload.time,
          timeLinePercentage: "0%",
        },
      };

    case "START_TIMER":
      // To avoid reseting the timer if the timer is'nt finished yet
      const time = isTimerFinished ? fullTime : currentTime;
      const timeLine = isTimerFinished ? "0%" : timeLinePercentage;
      return {
        setting: {
          ...state.setting,
        },
        time: {
          ...state.time,
          isStarted: true,
          currentTime: time,
          isTimerFinished: false,
          timeLinePercentage: timeLine,
        },
      };

    case "STOP_TIMER":
      return {
        setting: {
          ...state.setting,
        },
        time: {
          ...state.time,
          isStarted: false,
        },
      };

    case "UPDATE_CURRENT_TIME":
      document.title = `${clockFormatGenerator(payload)}-Time to focus!`
      return {
        setting: {
          ...state.setting,
        },
        time: {
          ...state.time,
          currentTime: payload,
          ...timeLinePercentageCalculator(fullTime, payload),
        },
      };

    case "TIMER_FINISH":
      return {
        setting: {
          ...state.setting,
        },
        time: {
          ...state.time,
          currentTime: 0,
          isStarted: false,
          isTimerFinished: true,
        },
      };

    case "GET_SETTING_FROM_LOCAL_STORAGE":
      return {
        setting: {
          ...getSettingFromLocalStorage(state.setting),
        },
        time: {
          ...state.time,
        },
      };

    case "SET_NEW_SETTING":
      const timerSetting = {
        ...state.setting,
        pomodoro: action.payload.pomodoro,
        shortBreak: action.payload.shortBreak,
        longBreak: action.payload.longBreak,
        alarmAudio: action.payload.alarmAudio,
        darkMode: action.payload.darkMode
      };
      return {
        setting: {
            ...setSettingToLocalStorage(timerSetting),
        },
        time: {
          ...state.time,
          activeTimer: "pomodoro",
          isTimerFinished: false,
          isStarted: false,
          fullTime: action.payload.pomodoro,
          currentTime: action.payload.pomodoro,
          timeLinePercentage: 0,
        },
      };

    default:
      return state;
  }
};

export default timerReducer;