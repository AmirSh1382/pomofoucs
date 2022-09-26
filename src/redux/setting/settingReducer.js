// Functions
import { getSettingFromLocalStorage } from "../../helper/fucntions"

const initialState = {
    isThereLocalSetting: false,
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900
}

const settingReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_SETTING_FROM_LOCAL_STORAGE":
            return {
                ...getSettingFromLocalStorage(state)
            }

        case "SET_NEW_SETTING":
            return {
                ...state,
                pomodoro: action.payload
            }

        default:
            return state
    }
}

export default settingReducer