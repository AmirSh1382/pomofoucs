// Functions
import { minuteToSecond } from "../../helper/fucntions"

const getSettingFromLocalStorage = () => {
    return 
}

const setNewSetting = (pomodoro, shortBreak, longBreak) => {
    return {type: "SET_NEW_SETTING", payload: {
        pomodoro: minuteToSecond(pomodoro),
        shortBreak: minuteToSecond(shortBreak),
        longBreak: minuteToSecond(longBreak)
    }}
}

export { getSettingFromLocalStorage, setNewSetting }