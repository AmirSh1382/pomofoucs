import React from "react";

// Redux
import { useSelector } from "react-redux";

const TaskBody = () => {

  const timerState = useSelector(state => state.timerState)
  const { activeTimer } = timerState.time

  return (
    <div className="dark:hidden mt-5 pb-10">
      {/* <button 
        className="border-2  border-dashed border-add-btn rounded-lg text-add-btn
          w-full transition bg-add-btn hover:bg-add-btn-hover py-3"
      >
        Add Task
      </button> */}
      <form className="rounded bg-white text-black overflow-hidden" onSubmit={e => e.preventDefault()}>
        <div className="px-4">
          <input 
            type="text" 
            placeholder="What are you working on?"
            className="focus:outline-none text-xl placeholder:italic placeholder:opacity-75 mt-8" 
          />
          <div className="mt-6">
            <div>Task time: (optional)</div>
            <input
              type="text"
              placeholder="min" 
              className="border border-stone-400 rounded w-1/6 focus:outline-none mt-3 p-1"
            />
          </div>
          <div className={`
              ${activeTimer === "pomodoro" && "text-pomodoro"}
              ${activeTimer === "shortBreak" && "text-shortBreak"}
              ${activeTimer === "longBreak" && "text-longBreak"}
              text-sm cursor-pointer transitoin-colors duration-500 mt-6`
            }    
          >
            + Add note
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2 p-2">
          <button
            className={`
              ${activeTimer === "pomodoro" && "border-pomodoro text-pomodoro"}
              ${activeTimer === "shortBreak" && "border-shortBreak text-shortBreak"}
              ${activeTimer === "longBreak" && "border-longBreak text-longBreak"}
              border rounded-md transition-colors duration-500
              active:translate-y-1 px-2 py-1`
            }
          >
            Cancel
          </button>
          <button 
            className={`
              ${activeTimer === "pomodoro" && "bg-pomodoro"}
              ${activeTimer === "shortBreak" && "bg-shortBreak"}
              ${activeTimer === "longBreak" && "bg-longBreak"}
              border text-white rounded-md transition-colors duration-500
              active:translate-y-1 py-1 px-2`
            }
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskBody;
