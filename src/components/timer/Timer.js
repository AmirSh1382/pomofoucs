import React, { useEffect, useRef } from "react";

// Functions
import { clockFormatGenerator } from "../../helper/fucntions";

// styles
import styles from "./Timer.module.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { 
    setNewTimerConfigs,
    startTimerAction,
    stopTimerAction,
    timerFinish, 
    updateCurrentTime 
  } from "../../redux/timer/timerAction";

// Audios
import startAudio from "../../asset/audios/start-click.mp3"
import stopAudio from "../../asset/audios/stop-click.mp3"
import crystalAlarm from "../../asset/audios/alarm-Crystal.mp3"
import deepThoughtAlarm from "../../asset/audios/alarm-Deep Thought.wav"
import dingAlarm from "../../asset/audios/alarm-Ding.mp3"
import ideaAlarm from "../../asset/audios/Alarm-Idea.wav"
import rockAlarm from "../../asset/audios/alarm-Rock.mp3"
import telepathyAlarm from "../../asset/audios/alarm-Telepathy.mp3"

const Timer = () => {
  const dispatch = useDispatch();

  const timerState = useSelector(state => state.timerState)

  const { setting, time } = timerState

  const { pomodoro, shortBreak, longBreak, alarmAudio, darkMode } = setting;

  const { isStarted, currentTime, activeTimer } = time;

  // Audios Ref
  const startAudioRef = useRef()
  const stopAudioRef = useRef()
  const alarmAudioRef = useRef()

  // Alarm Audio src
  const alarmSrc = 
      alarmAudio === "crystal" ? crystalAlarm :
      alarmAudio === "telepathy" ? telepathyAlarm :
      alarmAudio === "rock" ? rockAlarm :
      alarmAudio === "idea" ? ideaAlarm :
      alarmAudio === "ding" ? dingAlarm :
      alarmAudio === "deepThought" && deepThoughtAlarm

  let interval = null;

  useEffect(() => {
    dispatch(setNewTimerConfigs(pomodoro, "pomodoro"))
    // eslint-disable-next-line
  } , [pomodoro, shortBreak, longBreak])

  const startTimer = () => {
    dispatch(startTimerAction());
    startAudioRef.current.play()
    darkMode && document.documentElement.classList.add("dark")
  };
  
  const stopTimer = () => {
    dispatch(stopTimerAction());
    clearInterval(interval);
    stopAudioRef.current.play()
    document.documentElement.classList.remove("dark")
  };
  
  const changeTimer = (time, name) => {
    if (isStarted) {
      const confirmation = window.confirm("Timer is still running! This will reset the timer \nare you sure?");
      
      if (confirmation) {
        stopTimer();
        dispatch(setNewTimerConfigs(time, name));
      }
    } else {
      dispatch(setNewTimerConfigs(time, name));
    }
  };
  
  if (isStarted) {
    interval = setInterval(() => {
      if (currentTime > 0) {
        dispatch(updateCurrentTime(currentTime - 1));
      } else {
        dispatch(timerFinish())
        alarmAudioRef.current.play()
        document.documentElement.classList.remove("dark")
      };

      clearInterval(interval)
    }, 1000);
  }

  return (
    <>
      {/* Auidos */}
      <div>
        {/* Start Audio */}
        <audio ref={startAudioRef} src={startAudio}></audio>
        {/* Stop Audio */}
        <audio ref={stopAudioRef} src={stopAudio}></audio>
        {/* Alarm Audio */}
        <audio ref={alarmAudioRef} src={alarmSrc}></audio>
      </div>

      {/* Timer */}
      <div className="max-w-lg bg-primary rounded-xl py-5 mx-auto mt-10">
        <div className="flex justify-center items-center gap-3 dark:invisible">
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
                ${styles.button}`
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
                ${styles.startBtn}`
              }
            >
              Start
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Timer;