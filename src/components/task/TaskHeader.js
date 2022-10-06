import React, { useRef, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { clearFinishedTasksAction,checkAllTasksAction,clearAllTasksAction } from "../../redux/task/taskActions";

// Functions
import { detectSelectedTask } from "../../helper/fucntions";

// React-toasify
import { toast } from "react-toastify";

const TaskHeader = () => {
  const dispatch = useDispatch();

  const taskState = useSelector(state => state.taskState);
  const { tasks } = taskState;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const optionsRef = useRef();
  const iconRef = useRef();

  // To clear finished tasks
  const clearFinishedTasks = () => {
    dispatch(clearFinishedTasksAction());
    toast.success("Finished tasks removed");
  };

  // To check all tasks
  const checkAllTasks = () => {
    dispatch(checkAllTasksAction());
    toast.success("All tasks checked");
  };

  // To clear all tasks with confirmation
  const clearAllTasks = () => {
    let confirmation = tasks.length ? window.confirm("Are you sure you want to delete all tasks?")
      : true

    if (confirmation) {
      dispatch(clearAllTasksAction());
      toast.success("All tasks removed");
    }
  };

  // To close the task options menu
  document.addEventListener("click", (e) => {
    e.target !== optionsRef.current && e.target !== iconRef.current && setIsMenuOpen(false);

    document.removeEventListener("click", document);
  });

  return (
    <div className="text-center text-lg mt-8">
      <div>#{tasks.length}</div>

      <div>{detectSelectedTask(tasks)}</div>

      <div className="flex relative items-center justify-between pb-3 pt-1 border-b-2 dark:invisible">
        <span>Tasks</span>
        <button
          ref={optionsRef}
          className="transition active:translate-y-1"
          onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}
        >
          <i ref={iconRef}
            className="bi bi-three-dots-vertical cursor-pointer bg-primary rounded p-1"
          ></i>
        </button>

        <div
          className={`${!isMenuOpen && "hidden"}
            absolute top-full rounded overflow-hidden -translate-y-1 right-0 bg-white text-black shadow-xl mb-3 z-10`}
        >
          <ul className="text-start cursor-pointer text-base [&>li]:py-2 [&>li]:px-3">
            <li onClick={clearFinishedTasks} className="hover:bg-neutral-200">
              <i className="bi bi-check2-circle text-xl mr-2"></i>
              <span>Clear finished tasks</span>
            </li>

            <li onClick={checkAllTasks} className="hover:bg-neutral-200">
              <i className="bi bi-check-all text-xl mr-2"></i>
              <span>Check all tasks</span>
            </li>

            <li onClick={clearAllTasks} className="hover:bg-neutral-200">
              <i className="bi bi-trash text-xl mr-2"></i>
              <span>Clear all tasks</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;