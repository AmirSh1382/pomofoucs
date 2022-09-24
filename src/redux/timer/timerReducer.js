const initialState = {
    status: "stopped",
    fullTime: 15000,
    currentTime: 0,
    stoppedTime: 0,
}

const timerReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_NEW_TIMER_TIME":
            return {
                ...state, 
                fullTime: action.payload
            }

        case "STOP_TIMER":
            return {
                ...state,
                status: "stopped",
                stoppedTime: state.currentTimerTime
            }
        
        case "START_TIMER":
            return {
                ...state,
                status: "started",
                currentTime: state.stoppedTime ? state.stoppedTime : state.fullTime
            }

        case "UPDATE_CURRENT_TIME":
            return {
                ...state,
                currentTime: action.payload
            }

        default :
            return state
    }
}

export default timerReducer