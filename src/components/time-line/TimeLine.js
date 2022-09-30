import React from "react";

// Redux
import { useSelector } from "react-redux";

const TimeLine = () => {
  const timerState = useSelector(state => state.timerState);

  return (
    <div
      style={{ height: "2px" }}
      className="relative rounded bg-time-line w-full mt-4"
    >
      <div
        style={{ width: timerState.time.timeLinePercentage }}
        className=" absolute left-0 top-1/2 h-1 bg-white rounded -translate-y-1/2 transition"
      ></div>
    </div>
  );
};

export default TimeLine;