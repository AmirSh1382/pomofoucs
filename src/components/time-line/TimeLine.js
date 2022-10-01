import React from "react";

// Redux
import { useSelector } from "react-redux";

const TimeLine = () => {
  const timeLinePercentage = useSelector(state => state.timerState.time.timeLinePercentage);

  return (
    <div
      style={{ height: "2px" }}
      className="relative rounded bg-time-line w-full mt-4"
    >
      <div
        style={{ width: timeLinePercentage, transition: "0.2s all" }}
        className=" absolute left-0 top-1/2 h-1 bg-white rounded -translate-y-1/2 transition"
      ></div>
    </div>
  );
};

export default TimeLine;