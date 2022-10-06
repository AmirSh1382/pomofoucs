import React, { useEffect, useState } from "react";

// Components
import Header from "./header/Header";
import TimeLine from "./time-line/TimeLine";
import Timer from "./timer/Timer";
import TaskHeader from "./task/TaskHeader";
import TaskBody from "./task/TaskBody";
import TaskFooter from "./task/TaskFooter";
import ReactToastify from "./Shared/ReactToastify";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setNewTimerConfigs, getSettingFromLocalStorage } from "../redux/timer/timerAction";

const Landing = () => {
  const dispatch = useDispatch();

  const timerState = useSelector(state => state.timerState)

  const { setting, time } = timerState

  const { activeTimer } = time

  const { pomodoro, isThereLocalSetting } = setting

  const [ minHeight, setMinHeight ] = useState(visualViewport.height + "px");

  // To aviod scrolling in opera browser
  window.addEventListener("resize", () => {
    setMinHeight(visualViewport.height + "px");
  });

  useEffect(() => {
    dispatch(getSettingFromLocalStorage());
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
      <div className="text-white max-w-2xl mx-auto px-6 pt-4">
        <ReactToastify />

        <Header />

        <div>
          <TimeLine />
          <Timer />
        </div>

        <div className="max-w-lg mx-auto px-3">
          <TaskHeader />
          <TaskBody />
          <TaskFooter />
        </div>
      </div>
    </div>
  );
};

export default Landing;