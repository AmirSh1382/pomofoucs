import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

// Functions
import { clockFormatGenerator, calculateFinishedTasks } from "../../helper/fucntions";

const TaskFooter = () => {
  const taskState = useSelector(state => state.taskState)

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
    <div className="border-t dark:hidden pb-10">
      <div className="flex items-center justify-between bg-primary rounded-b-lg p-3">
        <div>
          <div>
            <span className="text-primary">
              Task
            </span>
            &nbsp;
            <span>
              {taskState.tasks.length}
            </span>
          </div>

          <div className="mt-2">
            <span className="text-primary">Finished</span>
            &nbsp;
            <span>
              {calculateFinishedTasks(taskState.tasks)}
            </span>
          </div>
        </div>

        <div className="text-3xl">
          {clockFormatGenerator(time)}
        </div>
      </div>
    </div>
  );
};

export default TaskFooter;
