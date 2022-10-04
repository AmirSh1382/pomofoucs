// Functions
import { setTaskStateInToLocalStorage, getTaskStateFromLocalStorage,  } from "../../helper/fucntions";
import { setTaskActive, changeFinishedStatus, checkAllTasks } from "../../helper/fucntions";
import { clearFinishedTasks, clearAllTasks } from "../../helper/fucntions"

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TASK":
      const updatedState = {
        ...state,
        tasks: [...state.tasks, payload],
      }
      return {
        ...setTaskStateInToLocalStorage(updatedState)
      };

    case "GET_TASK_STATE_FROM_LOCAL_STORAGE":
      return {
        ...getTaskStateFromLocalStorage(state)
      }

    case "SET_TASK_ACTIVE":
      return {
        ...setTaskActive(state, payload)
      }

    case "CHANGE_FINISHED_STATUS":
      return {
        ...changeFinishedStatus(state, payload)
      }

    case "CHECK_ALL_TASKS":
      return {
        ...checkAllTasks(state)
      }

    case "CLEAR_FINISHED_TASKS":
      return {
        ...clearFinishedTasks(state)
      }

    case "CLEAR_ALL_TASKS":
      return {
        ...clearAllTasks(state)
      }

    default:
      return state;
  }
};

export default taskReducer;