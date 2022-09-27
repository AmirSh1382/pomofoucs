import React, { useEffect, useState } from "react";

// Componetnts
import Input from "./shared/Input";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setNewSetting } from "../redux/setting/settingAction";

// Funstions
import { secondToMinute, inputValidation } from "../helper/fucntions";

const Setting = () => {
  const dispatch = useDispatch();

  const settingState = useSelector(state => state.settingState);
  const { pomodoro, shortBreak, longBreak } = settingState;

  const [ isSettingOpen, setIsSettingOpen ] = useState(false);

  const [ pomoFocusValue, setPomoFocusValue ] = useState(0);
  const [ shortBreakValue, setShortBreakValue ] = useState(0);
  const [ longBreakValue, setLongBreakValue ] = useState(0);

  const [ error, setError ] = useState("");

  useEffect(() => {
    setPomoFocusValue(secondToMinute(pomodoro))
    setShortBreakValue(secondToMinute(shortBreak))
    setLongBreakValue(secondToMinute(longBreak))
  }, [pomodoro, shortBreak, longBreak])

  const resetSettingForm = () => {
    setIsSettingOpen(false);

    setError("");

    setPomoFocusValue(secondToMinute(pomodoro));
    setShortBreakValue(secondToMinute(shortBreak));
    setLongBreakValue(secondToMinute(longBreak));
  };

  const validateInputs = () => {
    if (inputValidation(pomoFocusValue,shortBreakValue, longBreakValue)) {
      setError("Wrong Value !");
    } else {
      setError("");
      setIsSettingOpen(false);

      dispatch(setNewSetting(pomoFocusValue, shortBreakValue, longBreakValue));
    }
  };

  return (
    <>
      <button
        onClick={() => setIsSettingOpen(true)}
        className="bg-secondary rounded transition active:translate-y-1 px-2 py-1"
      >
        Setting
      </button>

      {/* Setting Wrapper */}
      <div
        className={`${isSettingOpen ? "backdrop-blur-sm -translate-y-0" : "-translate-y-full"}
          fixed top-0 left-0 w-full h-full flex items-center justify-center transition duration-500`}
      >
        <div className="rounded-md bg-white text-black w-full max-w-md divide-y px-5 py-4 mx-3 ">
          {/* Setting header */}
          <div className="flex justify-between items-center pb-4">
            <div className="text-muted text-lg font-semibold">
              Timer Setting
            </div>
            <div onClick={resetSettingForm} className="cursor-pointer">
              close
            </div>
          </div>

          {/* Time Setting */}
          <div className={`${error ? "py-4" : "py-5"}`}>
            <span className="font-semibold text-lg">time (1-60 min)</span>
            <div className="flex gap-x-5 mt-6">
              <Input label="Pomodoro" value={pomoFocusValue} setState={setPomoFocusValue} />
              <Input label="Short Break" value={shortBreakValue} setState={setShortBreakValue} />
              <Input label="Long Break" value={longBreakValue} setState={setLongBreakValue} />
            </div>
            <div className={`${!error && "hidden"} text-red-500 mt-3`}>
              {error}
            </div>
          </div>

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