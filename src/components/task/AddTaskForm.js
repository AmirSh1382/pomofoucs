import React, { useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { changeFormStatus, addTaskAction } from "../../redux/task/taskActions";

// UUID
import { v4 as uuidv4 } from "uuid";

// React-toastify
import { toast } from "react-toastify";

const AddTaskForm = (props) => {
  const { taskValue, setTaskValue, timeValue, setTimeValue, noteValue, setNoteValue } = props;
  const { taskInputRef, containerRef } = props

  const dispatch = useDispatch();

  const timerState = useSelector(state => state.timerState);
  const { activeTimer } = timerState.time;

  const taskState = useSelector(state => state.taskState);
  const { isFormOpen, isNoteInputOpen } = taskState;

  const noteInputRef = useRef()

  // To reset form inputs
  const resetFormInputs = () => {
    setTaskValue("");
    setNoteValue("");
    setTimeValue("");
  };

  // To close the form with confiramtion
  const closeForm = () => {
    const confirmation = taskInputRef.current.value ?
      window.confirm("The input data will be lost. Are you sure you want to close it?")
      : true;

    if (confirmation) {
      dispatch(changeFormStatus(false, false));
      resetFormInputs();
    }
  };

  // To validate form inputs
  const formValidation = () => {
    if (!taskValue.trim().length) toast.error("Task title cant be empty");
    else if (isNaN(timeValue)) toast.error("Time format not suported");
    else if ((timeValue.length || timeValue === 0) && (timeValue < 1 || timeValue > 60)) {
      toast.error("Time must be at least 1 and at most 60 minutes");
    } else {
      const newTask = {
        id: uuidv4(),
        title: taskValue,
        time: Math.floor(timeValue) ? Math.floor(timeValue) : timeValue,
        note: noteValue,
        selected: false,
        finished: false,
      };

      dispatch(addTaskAction(newTask));
      resetFormInputs();

      setTimeout(() => {
        containerRef.current.scrollIntoView({behavior: "smooth", block: "start"})
      }, 50)
    }
  };

  return (
    <div>
      <form
        onSubmit={e => e.preventDefault()}
        onKeyPress={e => e.key === "Enter" && formValidation()}
        style={{
          transform: `${isFormOpen ? "scaleY(1)" : "scaleY(0)"}`,
          height: `${isFormOpen ? "100%" : "0"}`,
        }}
        className="rounded-md bg-white text-black overflow-hidden transition duration-300"
      >
        <div className="px-4">
          <input
            type="text"
            ref={taskInputRef}
            value={taskValue}
            onChange={e => setTaskValue(e.target.value)}
            placeholder="What are you working on?"
            className="focus:outline-none bg-white w-full text-xl placeholder:italic mt-8"
          />

          <div className="mt-6">
            <div>Task time: (optional)</div>
            <input
              type="text"
              placeholder="min"
              value={timeValue}
              onChange={e => setTimeValue(e.target.value)}
              className="border border-zinc-400 rounded w-1/6 focus:outline-none mt-3 p-1"
            />
          </div>

          <div
            onClick={() => {dispatch(changeFormStatus(true, true)); noteInputRef.current.focus()}}
            className={`
              ${activeTimer === "pomodoro" && "text-pomodoro"}
              ${activeTimer === "shortBreak" && "text-shortBreak"}
              ${activeTimer === "longBreak" && "text-longBreak"}
              ${isNoteInputOpen && "hidden"}
              text-sm cursor-pointer transitoin-colors duration-500 mt-6`}
          >
            + Add note
          </div>

          <div className={`${!isNoteInputOpen && "hidden"} mt-5`}>
            <div
              className={`
                ${activeTimer === "pomodoro" && "text-pomodoro"}
                ${activeTimer === "shortBreak" && "text-shortBreak"}
                ${activeTimer === "longBreak" && "text-longBreak"}`}
            >
              Task note:
            </div>

            <textarea
              ref={noteInputRef}
              value={noteValue}
              onChange={e => setNoteValue(e.target.value)}
              className="w-full border border-zinc-400 focus:outline-none rounded mt-1 p-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2 p-2">
          <button
            onClick={closeForm}
            className={`
              ${activeTimer === "pomodoro" && "border-pomodoro text-pomodoro"}
              ${activeTimer === "shortBreak" && "border-shortBreak text-shortBreak"}
              ${activeTimer === "longBreak" && "border-longBreak text-longBreak"}
              border rounded-md transition-colors duration-500 px-2 py-1`}
          >
            Cancel
          </button>
          <button
            onClick={formValidation}
            className={`
              ${activeTimer === "pomodoro" && "bg-pomodoro"}
              ${activeTimer === "shortBreak" && "bg-shortBreak"}
              ${activeTimer === "longBreak" && "bg-longBreak"}
              border rounded-md transition-colors duration-500 text-white py-1 px-2
              hover:brightness-[0.95]`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;