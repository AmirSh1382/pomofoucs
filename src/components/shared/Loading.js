import React from "react";

// React-spinner
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center flex-1">
      <RingLoader color="#fcd34d" />
    </div>
  );
};

export default Loading;