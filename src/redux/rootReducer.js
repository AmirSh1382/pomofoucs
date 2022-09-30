import { combineReducers } from "redux"

// Reducers
import timerReducer from "./timer/timerReducer"

const rootReducer= combineReducers({
    timerState: timerReducer,
})

export default rootReducer