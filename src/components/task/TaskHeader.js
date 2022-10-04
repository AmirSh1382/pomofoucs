import React, { useRef, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { clearFinishedTasksAction, checkAllTasksAction, clearAllTasksAction } from "../../redux/task/taskActions"; 

// Functions
import { detectSelectedTask } from "../../helper/fucntions";

// React-toasify
import { toast } from "react-toastify";

const TaskHeader = () => {
  const dispatch = useDispatch()

  const taskState = useSelector(state => state.taskState)
  const { tasks } = taskState

  const [ isMenuOpen, setIsMenuOpen ] = useState(false)

  const optionsRef = useRef()
  const iconRef = useRef()

  const clearFinishedTasks = () => {
    dispatch(clearFinishedTasksAction())
    toast.warn("Finished tasks removed")
  }

  const checkAllTasks = () => {
    toast.warn("All tasks checked")
    dispatch(checkAllTasksAction())
  }

  const clearAllTasks = () => {
    let confirmation = true
    if (tasks.length) {
      confirmation = window.confirm("Are you sure you want to delete all tasks?")
    }

    if (confirmation) {
      toast.warn("All tasks removed")
      dispatch(clearAllTasksAction())
    }
  }

  // To close the task options menu
  document.addEventListener("click", e => {
    e.target !== optionsRef.current && e.target !== iconRef.current && 
    setIsMenuOpen(false)

    document.removeEventListener("click", document)
  })

  return (
    <div className="text-center text-lg mt-8">
      <div>
        #{tasks.length}
      </div>

      <div>
        {detectSelectedTask(tasks)}
      </div>

      <div className="flex relative items-center justify-between pb-3 pt-1 border-b-2 dark:invisible">
        <span>Tasks</span>
        <button 
          ref={optionsRef}
          onClick={() => isMenuOpen ? setIsMenuOpen(false): setIsMenuOpen(true)}
          className="transition active:translate-y-1"
        >
          <i 
            ref={iconRef}
            className="bi bi-three-dots-vertical cursor-pointer bg-primary rounded p-1"
          >
          </i>
        </button>

        <div className={`${!isMenuOpen && "hidden"}
            absolute top-full rounded overflow-hidden -translate-y-1 right-0 bg-white text-black shadow-xl mb-3 z-10`
          }
        >
          <ul className="text-start cursor-pointer text-base [&>li]:py-2 [&>li]:px-3">
            <li 
              onClick={clearFinishedTasks}
              className="hover:bg-neutral-200"
            >
              <i className="bi bi-check2-circle text-xl mr-2"></i>
              <span>Clear finished tasks</span>
            </li>

            <li 
              onClick={checkAllTasks}
              className="hover:bg-neutral-200"
            >
              <i className="bi bi-check-all text-xl mr-2"></i>
              <span>Check all tasks</span>
            </li>

            <li 
              onClick={clearAllTasks}
              className="hover:bg-neutral-200"
            >
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