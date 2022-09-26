import { combineReducers } from "redux"

// Reducers
import timerReducer from "./timer/timerReducer"
import settingReducer from "./setting/settingReducer"

const rootReducer= combineReducers({
    timerState: timerReducer,
    settingState: settingReducer
})

export default rootReducer