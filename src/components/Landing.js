import React, { useEffect } from "react";

// Components
import Timer from "./Timer";

// Redux
import { useDispatch, useSelector } from "react-redux";

const Landing = () => {

  const dispatch = useDispatch();

  const settingState = useSelector(state => state.settingState);

  const { pomodoro, isThereLocalSetting } = settingState;

  useEffect(() => {
    dispatch({ type: "GET_SETTING_FROM_LOCAL_STORAGE" });

    dispatch({ type: "SET_NEW_CONFIGS", payload: pomodoro })
    
    // eslint-disable-next-line
  }, [isThereLocalSetting]);

  return (
    <div>
      <Timer />
    </div>
  );
};

export default Landing;