import React, { useEffect, useState } from "react";

// Components
import Header from "./header/Header";
import TimeLine from "./time-line/TimeLine";
import Timer from "./timer/Timer";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setNewTimerConfigs } from "../redux/timer/timerActions";

const Landing = () => {
  const dispatch = useDispatch();

  const timerState = useSelector(state => state.timerState)

  const { activeTimer } = timerState

  const settingState = useSelector(state => state.settingState);

  const { pomodoro, isThereLocalSetting } = settingState;

  const [ minHeight, setMinHeight ] = useState(visualViewport.height + "px");

  window.addEventListener("resize", () => {
    setMinHeight(visualViewport.height + "px");
  });

  useEffect(() => {
    dispatch({type: "GET_SETTING_FROM_LOCAL_STORAGE"});

    dispatch(setNewTimerConfigs(pomodoro, "pomodoro"));

    // eslint-disable-next-line
  }, [isThereLocalSetting]);

  return (
    <div 
      style={{ minHeight: minHeight }} 
      className={`
        ${activeTimer === "pomodoro" && "bg-pomodoro"}
        ${activeTimer === "shortBreak" && "bg-shortBreak"}
        ${activeTimer === "longBreak" && "bg-longBreak"}
        dark:bg-dark transition duration-500`
      }
    >
      <div className="text-white max-w-2xl mx-auto px-6 pt-4 mb-2">
        <Header />
        <TimeLine />
        <Timer />
      </div>
    </div>
  );
};

export default Landing;