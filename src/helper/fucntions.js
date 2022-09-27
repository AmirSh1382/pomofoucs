const clockFormatGenerator = time => {
  let minute = Math.floor(time / 60);
  let second = time % 60;

  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;

  const finallFormat = `${minute} : ${second}`;

  return finallFormat;
};

const getSettingFromLocalStorage = state => {
  const localSetting = JSON.parse(localStorage.getItem("setting"));

  return localSetting ? { ...localSetting, isThereLocalSetting: true } : state;
};

const setSettingToLocalStorage = state => {
  localStorage.setItem("setting", JSON.stringify(state))

  return state
}

const timeLinePercentageCalculator = (fullTime, currentTime) => {
  const timeLinePercentage = (100 - (currentTime / fullTime) * 100).toFixed(2) + "%";

  return { timeLinePercentage };
};

const secondToMinute = time => {
  return Math.floor(time / 60);
};

const minuteToSecond = time => {
  return time * 60;
};

const inputValidation = (pomodoro, shortBreak, longBreak) => {
  let error = false;

  if (isNaN(pomodoro) || pomodoro > 60 || pomodoro <= 0) {
    error = true;
  } else if (isNaN(shortBreak) || shortBreak > 60 || shortBreak <= 0) {
    error = true;
  } else if (isNaN(longBreak) || longBreak > 60 || longBreak <= 0) {
    error = true;
  }

  return error;
};

export { getSettingFromLocalStorage, setSettingToLocalStorage }
export { timeLinePercentageCalculator ,clockFormatGenerator };
export { secondToMinute, minuteToSecond, inputValidation };