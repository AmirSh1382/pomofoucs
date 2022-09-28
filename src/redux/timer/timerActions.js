const setNewTimerConfigs = (time, name) => {
    return {type: "SET_NEW_TIMER_CONFIGS", payload: {time, name}}
}

export { setNewTimerConfigs }