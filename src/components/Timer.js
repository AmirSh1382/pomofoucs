import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Functions
import { clockFormatGenerator } from "../helper/fucntions";

const Timer = () => {
  const dispatch = useDispatch();

  const settingState = useSelector(state => state.settingState)

  const timerState = useSelector(state => state.timerState);
  
  const { pomodoro, shortBreak, longBreak } = settingState

  const { isStarted, currentTime, timeLinePercentage } = timerState;

  let interval = null;

  const startTimer = () => {
    dispatch({ type: "START_TIMER" });
  };

  const stopTimer = () => {
    dispatch({ type: "STOP_TIMER" });

    clearInterval(interval);
  };

  if (isStarted) {
    interval = setInterval(() => {
      if (currentTime > 0) {
        
        dispatch({ type: "UPDATE_CURRENT_TIME", payload: currentTime - 1 });

        // To avoid making multiple intervals
        clearInterval(interval);
      } else {
        dispatch({ type: "TIMER_FINISH" });
        clearInterval(interval)
      }
    }, 1000);
  }

  const changeTimer = newTimerTime => {

    if(isStarted){
      const confirmation = window.confirm("timer is still running are you sure")
  
      if(confirmation){
        stopTimer()
  
        dispatch({type: "SET_NEW_CONFIGS", payload: newTimerTime})
      }
    }else {
      dispatch({type: "SET_NEW_CONFIGS", payload: newTimerTime})
    }
  }

  const test = () => {
    dispatch({type: "SET_NEW_SETTING", payload: 1000000})
    dispatch({type: "SET_NEW_CONFIGS", payload: 1000000})
  }

  console.log(timerState)

  return (
    <div>

      <div className="relative h-1 bg-stone-200">
        <div 
          style={{width: timeLinePercentage, transition: "0.1s all" }}
          className="absolute left-0 top-1/2 bg-rose-300 h-1 -translate-y-1/2 transition duration-200"
        >
        </div>
      </div>

      {
        !isStarted ? (
            <button onClick={startTimer}>start</button>
        ) : (
            <button onClick={stopTimer}>stop</button>
        )
      }

      <div>
        {clockFormatGenerator(currentTime)}
      </div>

      <div>
        <button onClick={() => changeTimer(pomodoro)}>pomodoro</button>
        <button onClick={() => changeTimer(shortBreak)}>shortBreak</button>
        <button onClick={() => changeTimer(longBreak)}>longBreak</button>
        <button onClick={test}>longBreak</button>
      </div>
    </div>
  );
};

export default Timer;