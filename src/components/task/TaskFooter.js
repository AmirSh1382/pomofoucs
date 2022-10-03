import React, { useEffect, useState } from "react";

// Functions
import { clockFormatGenerator } from "../../helper/fucntions";

const TaskFooter = () => {
  const now = new Date();

  const [ time, setTime  ] = useState(now.getHours() * 60 + now.getMinutes());

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(now.getHours() * 60 + now.getMinutes())
    }, 1000);
    return () => clearInterval(interval);

    // eslint-disable-next-line
}, []);

  return (
    <div className="flex items-center justify-center pb-10">
      <div>
        <div></div>
        <div></div>
      </div>
      <div>
        {clockFormatGenerator(time)}
      </div>
    </div>
  );
};

export default TaskFooter;
