import { combineReducers } from "redux"

// Reducers
import timerReducer from "./timer/timerReducer"
import taskReducer from "./task/taskReducer"

const rootReducer= combineReducers({
    timerState: timerReducer,
    taskState: taskReducer
})

export default rootReducer