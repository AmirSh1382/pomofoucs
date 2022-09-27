import React, { useEffect, useState } from "react";

// Components
import Header from "./Header";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setNewTimerConfigs } from "../redux/timer/timerActions";

const Landing = () => {
  const dispatch = useDispatch();

  const settingState = useSelector(state => state.settingState);

  const { pomodoro, isThereLocalSetting } = settingState;

  const [ minHeight, setMinHeight ] = useState(visualViewport.height + "px");

  window.addEventListener("resize", () => {
    setMinHeight(visualViewport.height + "px");
  });

  useEffect(() => {
    dispatch({type: "GET_SETTING_FROM_LOCAL_STORAGE"});

    dispatch(setNewTimerConfigs(pomodoro));

    // eslint-disable-next-line
  }, [isThereLocalSetting]);

  return (
    <div style={{ minHeight: minHeight }} className="bg-primary dark:bg-dark transition">
      <div className="text-white max-w-2xl mx-auto px-6 pt-4 mb-2">
        <Header />
      </div>
    </div>
  );
};

export default Landing;