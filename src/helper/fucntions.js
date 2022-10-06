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

// To add a new task
const addTask = (state, newTask) => {
  state.tasks = [newTask, ...state.tasks]

  state.isFormOpen = false

  state.isNoteInputOpen = false

  setTaskStateInToLocalStorage({ ...state })

  return {...state}
}

// To delete a task based on its id
const deleteTask = (state, id) => {
  const tasks = state.tasks.filter(task => task.id !== id)

  setTaskStateInToLocalStorage({ ...state, tasks })

  return {...state, tasks}
}

// To set tasks state in to local storage
const setTaskStateInToLocalStorage = state => {
  localStorage.setItem("tasks", JSON.stringify(state))
}

// To get task state from local storage
const getTaskStateFromLocalStorage = state => {
  const localstate = JSON.parse(localStorage.getItem("tasks"))

  state.tasks = localstate ? localstate.tasks : []

  state.formOrder = state.tasks.length

  return {...state}
}

// To set a task active (focused)
const setTaskActive = (state, id) => {  
  let tasks = state.tasks.map(task => {
    task.selected = false;
    if (task.id  === id) task.selected = true
    return task
  })

  setTaskStateInToLocalStorage({ ...state, tasks })

  return { ...state, tasks }
}

// To detect that which task is selected right now (focused task)
const detectSelectedTask = tasks => {
  let selectedTask = tasks.find(task => task.selected);

  let mainTitle = selectedTask ? selectedTask.title : "Time to focus!"

  return mainTitle
}

// To change task status (is it done or not)
const changeFinishedStatus = (state, id) => {
  let tasks = state.tasks.map(task => {
    if (task.id === id) task.finished = !task.finished;
    return task
  })

  setTaskStateInToLocalStorage({ ...state, tasks })

  return { ...state, tasks }
}

// To check all the tasks (to change their status to done)
const checkAllTasks = state => {
  state.tasks.forEach(task => task.finished = true)

  setTaskStateInToLocalStorage({ ...state })

  return { ...state }
}

// To find and clear finished tasks
const clearFinishedTasks = state => {
  let tasks = state.tasks.filter(task => !task.finished)

  setTaskStateInToLocalStorage({ ...state, tasks })

  return { ...state, tasks }
}

// To clear all the tasks
const clearAllTasks = state => {
  state.tasks = []

  setTaskStateInToLocalStorage({ ...state })

  return { ...state }
}

// To calculate the number of finished tasks
const calculateFinishedTasks = tasks => {
  const finishedTasks = tasks.filter(task => task.finished)

  return finishedTasks.length
}

export { getSettingFromLocalStorage, setSettingToLocalStorage }
export { timeLinePercentageCalculator ,clockFormatGenerator };
export { secondToMinute, minuteToSecond, inputValidation };
export { setTaskStateInToLocalStorage, getTaskStateFromLocalStorage };
export { setTaskActive, detectSelectedTask, changeFinishedStatus };
export { checkAllTasks, clearFinishedTasks, clearAllTasks };
export { calculateFinishedTasks, addTask, deleteTask };