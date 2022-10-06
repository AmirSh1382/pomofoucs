const addTaskAction = newTask => {
    return {type: "ADD_TASK", payload: newTask}
}

const deleteTaskAction = id => {
    return {type: "DELETE_TASK", payload: id}
}

const getTaskStateFromLocalStorage = () => {
    return {type: "GET_TASK_STATE_FROM_LOCAL_STORAGE"}
}

const setTaskActive = id => {
    return {type: "SET_TASK_ACTIVE", payload: id}
}

const changeFinishedStatus = id => {
    return {type: "CHANGE_FINISHED_STATUS", payload: id}
}

const checkAllTasksAction = () => {
    return {type: "CHECK_ALL_TASKS"}
}

const clearFinishedTasksAction = () => {
    return {type: "CLEAR_FINISHED_TASKS"}
}

const clearAllTasksAction = () => {
    return {type: "CLEAR_ALL_TASKS"}
}

const changeFormStatus = (formStatus, noteInputStatus) => {
    return {type: "CHANGE_FORM_STATUS", payload: {formStatus, noteInputStatus}}
}

export { addTaskAction, setTaskActive, changeFinishedStatus, checkAllTasksAction }
export { changeFormStatus, deleteTaskAction, clearAllTasksAction }
export { getTaskStateFromLocalStorage, clearFinishedTasksAction }