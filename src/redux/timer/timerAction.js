// Functions
import { minuteToSecond } from "../../helper/fucntions";

const setNewTimerConfigs = (time, name) => {
  return { type: "SET_NEW_TIMER_CONFIGS", payload: { time, name } };
};

const getSettingFromLocalStorage = () => {
  return { type: "GET_SETTING_FROM_LOCAL_STORAGE" };
};

const setNewSetting = (pomodoro, shortBreak, longBreak, alarmAudio, darkMode) => {
  return {
    type: "SET_NEW_SETTING",
    payload: {
      pomodoro: minuteToSecond(pomodoro),
      shortBreak: minuteToSecond(shortBreak),
      longBreak: minuteToSecond(longBreak),
      alarmAudio,
      darkMode
    },
  };
};

const stopTimerAction = () => {
  return { type: "STOP_TIMER" };
};

const startTimerAction = () => {
  return { type: "START_TIMER" };
};

const timerFinish = () => {
  return { type: "TIMER_FINISH" };
};

const updateCurrentTime = time => {
  return { type: "UPDATE_CURRENT_TIME", payload: time };
};

export { getSettingFromLocalStorage, setNewSetting };
export { setNewTimerConfigs, stopTimerAction, startTimerAction };
export { timerFinish, updateCurrentTime };