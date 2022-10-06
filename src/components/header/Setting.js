import React, { useEffect, useState } from "react";

// Componetnts
import Input from "./Input";

// Funstions
import { secondToMinute, inputValidation } from "../../helper/fucntions";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setNewSetting } from "../../redux/timer/timerAction";

// React-toastify
import { toast } from "react-toastify";

const Setting = () => {
  const dispatch = useDispatch();

  const timerState = useSelector(state => state.timerState)

  const { pomodoro, shortBreak, longBreak, alarmAudio, darkMode } = timerState.setting
  
  const { isStarted } = timerState.time

  const [ isSettingOpen, setIsSettingOpen ] = useState(false);

  const [ pomodoroValue, setPomodoroValue ] = useState(0);
  const [ shortBreakValue, setShortBreakValue ] = useState(0);
  const [ longBreakValue, setLongBreakValue ] = useState(0);
  const [ alarmSelectValue, setAlarmSelectValue ] = useState("")
  const [ darkModeValue, setDarkModeValue ] = useState("")

  const [ error, setError ] = useState();

  useEffect(() => {
    setPomodoroValue(secondToMinute(pomodoro))
    setShortBreakValue(secondToMinute(shortBreak))
    setLongBreakValue(secondToMinute(longBreak))
    setAlarmSelectValue(alarmAudio)
    setDarkModeValue(darkMode)
  }, [pomodoro, shortBreak, longBreak, alarmAudio, darkMode])

  const resetSettingForm = () => {
    setIsSettingOpen(false);

    setError("");

    setPomodoroValue(secondToMinute(pomodoro));
    setShortBreakValue(secondToMinute(shortBreak));
    setLongBreakValue(secondToMinute(longBreak));
    setAlarmSelectValue(alarmAudio)
    setDarkModeValue(darkMode)
  };

  const validateInputs = () => {
    let confirmation = true

    if (isStarted){
      confirmation = window.confirm("Timer is still running! this will reset it \nare you sure?")
    }

    if (confirmation) {
      if (inputValidation(pomodoroValue, shortBreakValue, longBreakValue)) {
        setError("Wrong Value!");
      } else {
        document.documentElement.classList.remove("dark")

        setError("");
        setIsSettingOpen(false);
        toast.success("Setting updated")

        dispatch(setNewSetting(pomodoroValue, shortBreakValue, longBreakValue, alarmSelectValue, darkModeValue));
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsSettingOpen(true)}
        className="bg-primary rounded transition active:translate-y-1 px-2 py-1"
      >
        <i className="bi bi-gear"></i>
        <span className="hidden sm:inline ml-1">Setting</span>
      </button>

      {/* Setting Wrapper */}
      <div
        className={`${isSettingOpen ? "backdrop-blur-sm -translate-y-0" : "-translate-y-full"}
          fixed top-0 left-0 w-full min-h-full flex items-center justify-center transition duration-500 z-10`}
      >
        <div className="rounded-md bg-white text-black shadow-lg w-full max-w-md divide-y px-5 py-4 m-3">
          {/* Setting header */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-muted text-lg">
              Timer Setting
            </div>
            <div onClick={resetSettingForm} className="cursor-pointer">
              <i className="bi bi-x-lg text-xl opacity-60 hover:opacity-100"></i>
            </div>
          </div>

          {/* Time Setting */}
          <div className={`${error ? "py-4" : "py-5"}`}>
            <span className="font-semibold text-lg">
              time (1-60 min)
            </span>
            <div className="flex gap-x-5 mt-6">
              <Input label="Pomodoro" value={pomodoroValue} setValue={setPomodoroValue} />
              <Input label="Short Break" value={shortBreakValue} setValue={setShortBreakValue} />
              <Input label="Long Break" value={longBreakValue} setValue={setLongBreakValue} />
            </div>
            <div className={`${!error && "hidden"} text-red-500 mt-3`}>
              {error}
            </div>
          </div>

          {/* Alarm sound */}
          <div className="flex items-center justify-between py-4">
            <div className="font-semibold text-lg">
              Alarm Sound
            </div>

            <div className="inline-block relative w-32">
              <select 
                value={alarmSelectValue}
                onChange={e => setAlarmSelectValue(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-400
                hover:border-gray-500 px-4 py-2 pr-8 rounded shadow
                leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="crystal">Crystal</option>
                <option value="telepathy">telepathy</option>
                <option value="rock">rock</option>
                <option value="idea">idea</option>
                <option value="ding">ding</option>
                <option value="deepThought">deepThought</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Dark mode */}
          <div className="flex items-center justify-between py-4">
            <div className="font-semibold text-lg">
              Dark mode when running
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={darkModeValue}
                onChange={e => setDarkModeValue(e.target.checked)}
              />
              <div 
                className="w-11 h-6 rounded-full bg-gray-400 peer-checked:after:translate-x-full
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                  after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
              </div>
            </label>
          </div>

          {/* Save button */}
          <div className="flex justify-end pt-3 px-2">
            <button
              onClick={validateInputs}
              className="inline-block text-white bg-dark rounded 
                transition active:translate-y-1 px-5 py-1"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;