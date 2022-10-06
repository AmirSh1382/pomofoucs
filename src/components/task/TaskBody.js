import React, { useEffect, useState, useRef } from "react";

// Components
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getTaskStateFromLocalStorage, changeFormStatus } from "../../redux/task/taskActions";

const TaskBody = () => {

  const dispatch = useDispatch();

  const taskState = useSelector(state => state.taskState);
  const { tasks, isFormOpen  } = taskState;

  const [taskValue, setTaskValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [noteValue, setNoteValue] = useState("");

  const taskInputRef = useRef();
  const taskFormRef = useRef()
  const containerRef = useRef()

  const openTaskForm = () => {
    dispatch(changeFormStatus(true, false))
    taskInputRef.current.focus()

    setTimeout(() => {
      taskFormRef.current.scrollIntoView({behavior: "smooth"})
    }, 50)
  }

  useEffect(() => {
    dispatch(getTaskStateFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="dark:hidden mt-3 pb-10">
      <div 
        ref={containerRef}
        className="flex flex-col gap-y-2 transition duration-500"
      >
        {
          tasks.map(task => (
              <Task 
                {...task} 
                key={task.id} 
                setTaskValue={setTaskValue}
                setTimeValue={setTimeValue}
                setNoteValue={setNoteValue}
                taskInputRef={taskInputRef}
                taskFormRef={taskFormRef}
              />
            )
          )
        }

        <div ref={taskFormRef}>
          <AddTaskForm 
            taskValue={taskValue}
            timeValue={timeValue}
            noteValue={noteValue}
            setTaskValue={setTaskValue}
            setTimeValue={setTimeValue}
            setNoteValue={setNoteValue}
            containerRef={containerRef}
            taskInputRef={taskInputRef}
          />
        </div>

        <button
          onClick={openTaskForm}
          className={`
            ${isFormOpen && "hidden"}
            border-2 border-dashed border-add-btn rounded-lg text-add-btn
            w-full transition bg-add-btn hover:bg-add-btn-hover py-3`}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskBody;