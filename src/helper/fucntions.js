// To make a digital clock format
const clockFormatGenerator = time => {
  let minute = Math.floor(time / 60);
  let second = time % 60;

  if (minute < 10) minute = "0" + minute;
  if (second < 10) second = "0" + second;

  const finallFormat = `${minute}:${second}`;

  return finallFormat;
};

// to get setting from local storage
const getSettingFromLocalStorage = setting => {
  const localSetting = JSON.parse(localStorage.getItem("setting"));

  return localSetting ? { ...localSetting, isThereLocalSetting: true } : setting;
};

// To set setting in to the local storage
const setSettingToLocalStorage = setting => {
  localStorage.setItem("setting", JSON.stringify(setting))

  return setting
}

// To calculate the timerLine percentage based on the full and the current time
const timeLinePercentageCalculator = (fullTime, currentTime) => {
  const timeLinePercentage = (100 - (currentTime / fullTime) * 100).toFixed(2) + "%";

  return { timeLinePercentage };
};

// to convert second to minute
const secondToMinute = time => {
  return Math.floor(time / 60);
};

// To convert minute to second
const minuteToSecond = time => {
  return time * 60;
};

// To validate setting time inputs and return error if there is one
const inputValidation = (pomodoro, shortBreak, longBreak) => {
  let error = false;

  if (isNaN(pomodoro) || pomodoro > 60 || pomodoro < 1) {
    error = true;
  } else if (isNaN(shortBreak) || shortBreak > 60 || shortBreak < 1) {
    error = true;
  } else if (isNaN(longBreak) || longBreak > 60 || longBreak < 1) {
    error = true;
  }

  return error;
};

export { getSettingFromLocalStorage, setSettingToLocalStorage }
export { timeLinePercentageCalculator ,clockFormatGenerator };
export { secondToMinute, minuteToSecond, inputValidation };