import React, { useEffect } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Functions
import { clockFormatGenerator } from "../../helper/fucntions";

// styles
import styles from "./Timer.module.css";

const Timer = () => {
  const dispatch = useDispatch();

  const settingState = useSelector(state => state.settingState);

  const timerState = useSelector(state => state.timerState);

  const { pomodoro, shortBreak, longBreak } = settingState;

  const { isStarted, currentTime, activeTimer } = timerState;

  let interval = null;

  useEffect(() => {
    dispatch({type: "SET_NEW_TIMER_CONFIGS", payload: {time: pomodoro, name: "pomodoro"}})
    
    // eslint-disable-next-line
  } , [pomodoro, shortBreak, longBreak, dispatch])

  const startTimer = () => {
    dispatch({ type: "START_TIMER" });
  };
  
  const stopTimer = () => {
    dispatch({ type: "STOP_TIMER" });
    
    clearInterval(interval);
  };
  
  const changeTimer = (time, name) => {
    if (isStarted) {
      const confirmation = window.confirm("Timer is still running! This will reset the timer \nare you sure?");
      
      if (confirmation) {
        stopTimer();
        
        dispatch({ type: "SET_NEW_TIMER_CONFIGS", payload: { time, name } });
      }
    } else {
      dispatch({ type: "SET_NEW_TIMER_CONFIGS", payload: { time, name } });
    }
  };
  
  if (isStarted) {
    interval = setInterval(() => {
      if (currentTime > 0) {
        dispatch({ type: "UPDATE_CURRENT_TIME", payload: currentTime - 1 });
          
        // To avoid making multiple intervals
        clearInterval(interval);
      } else {
        dispatch({ type: "TIMER_FINISH" });
        clearInterval(interval);
      }
    }, 1000);
  }


  return (
    <div className="max-w-lg bg-primary rounded-xl py-5 mx-auto mt-10">
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => changeTimer(pomodoro, "pomodoro")}
          className={`${activeTimer === "pomodoro" && "bg-active-timer rounded"} 
            transition duration-100 active:translate-y-1 p-1`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => changeTimer(shortBreak, "shortBreak")}
          className={`${activeTimer === "shortBreak" && "bg-active-timer rounded"}
            transition duration-100 active:translate-y-1 p-1`}
        >
          Short Break
        </button>
        <button
          onClick={() => changeTimer(longBreak, "longBreak")}
          className={`${activeTimer === "longBreak" && "bg-active-timer rounded"}
            transition duration-100 active:translate-y-1 p-1`}
        >
          Long Break
        </button>
      </div>

      <div className="text-center text-8xl sm:text-9xl mt-6 mb-9">
        {clockFormatGenerator(currentTime)}
      </div>

      <div className={styles.btnContainer}>
        {isStarted ? (
          <button
            onClick={stopTimer}
            className={`        
              ${activeTimer === "pomodoro" && "text-pomodoro"}
              ${activeTimer === "shortBreak" && "text-shortBreak"}
              ${activeTimer === "longBreak" && "text-longBreak"}
              ${styles.button} 
              bg-white text-black`
            }
          >
            Stop
          </button>
        ) : (
          <button
            onClick={startTimer}
            className={`        
              ${activeTimer === "pomodoro" && "text-pomodoro"}
              ${activeTimer === "shortBreak" && "text-shortBreak"}
              ${activeTimer === "longBreak" && "text-longBreak"}
              ${styles.button}
              ${styles.startBtn}
              bg-white text-black `
            }
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;