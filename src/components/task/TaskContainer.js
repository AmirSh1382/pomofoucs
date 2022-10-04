import React, { useEffect } from "react";

// Components
import Task from "./Task";

// Redux
import { useDispatch, useSelector } from "react-redux";

const TaskContainer = () => {
  const dispatch = useDispatch();

  const taskState = useSelector(state => state.taskState);

  const { tasks } = taskState;

  useEffect(() => {
    dispatch({ type: "GET_TASK_STATE_FROM_LOCAL_STORAGE" });
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-y-2 mb-3">
      {tasks.map(task => <Task key={task.id} {...task} />)}
    </div>
  );
};

export default TaskContainer;