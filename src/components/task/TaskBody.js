import React, { useEffect, useRef, useState } from "react";

// Componetns
import TaskContainer from "./TaskContainer";

// Redux
import { useSelector, useDispatch } from "react-redux";

// react-toastify
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// UUID
import { v4 as uuidv4 } from 'uuid';

const TaskBody = () => {
  const dispatch = useDispatch()

  const timerState = useSelector(state => state.timerState)
  const { activeTimer } = timerState.time

  const [ isTaskformOpen, setIsTaskFormOpen ] = useState(false)
  const [ isNoteInputOpen, setIsNoteInputOpen ] = useState(false)
  const [ isEventListenerSet, setIsEventListinerSet ] = useState(false)

  const [ taskValue, setTaskValue ] = useState("")
  const [ timeValue, setTimeValue ] = useState("")
  const [ noteValue, setNoteValue ] = useState("")

  const taskInputRef = useRef()
  const taskFormRef = useRef()
  const addTaskBtnRef = useRef()

  
  const resetForm = () => {
    setIsNoteInputOpen(false)
    setTaskValue("")
    setNoteValue("")
    setTimeValue("")
  }

  const closeForm = () => {
    setIsTaskFormOpen(false)
    resetForm()
  }

  const formValidation = () => {
    if (!taskValue.trim().length) {
      toast.error("Task title cant be empty")
    } else if (isNaN(timeValue)) {
      toast.error("Time format not suported")
    } else if ((timeValue.trim().length || timeValue === 0) && (timeValue < 1 || timeValue > 60)) {
      toast.error("Time must be at least 1 and at most 60 minutes")
    } else {
      const newTask = {
        id: uuidv4(),
        title: taskValue,
        time: timeValue,
        note: noteValue,
        selected: false,
        finished: false
      }

      dispatch({type: "ADD_TASK", payload: newTask})
      toast.success("Task added successfully")
      resetForm()
    }
  }

  // To close the task form by clicking outside of it
  useEffect(() => {
    if(!isEventListenerSet) {
      setIsEventListinerSet(true)

      window.addEventListener("click", e => {
        if(addTaskBtnRef.current === e.target) return;
        else if(!taskFormRef.current.contains(e.target)) {
          if (taskInputRef.current.value) {
            const confirmation = window.confirm("The input data will be lost. Are you sure you want to close it?")
    
            confirmation &&  closeForm()
          } else {
            closeForm()
          }
        }
      })
    }

    // eslint-disable-next-line
  }, [taskValue])

  return (
    <div className="dark:hidden mt-3 pb-10">
      <ToastContainer position="top-center" />

      <TaskContainer />

      <button 
        ref={addTaskBtnRef}
        onClick={() => setIsTaskFormOpen(true)}
        className={`
          ${isTaskformOpen && "hidden"}
          border-2  border-dashed border-add-btn rounded-lg text-add-btn
          w-full transition bg-add-btn hover:bg-add-btn-hover py-3`
        }
      >
        Add Task
      </button>

      {/* Task form */}
      <form 
        ref={taskFormRef}
        onSubmit={e => e.preventDefault()}
        style={{transform: `${isTaskformOpen ? "scaleY(1)" : "scaleY(0)"}`,
          height: `${isTaskformOpen ? "100%" : "0"}`
        }}
        className="rounded-md bg-white text-black overflow-hidden transition duration-300"
      >
        <div className="px-4">
          <input 
          ref={taskInputRef}
            type="text" 
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
            onClick={() => setIsNoteInputOpen(true)}
            className={`
              ${activeTimer === "pomodoro" && "text-pomodoro"}
              ${activeTimer === "shortBreak" && "text-shortBreak"}
              ${activeTimer === "longBreak" && "text-longBreak"}
              ${isNoteInputOpen && "hidden"}
              text-sm cursor-pointer transitoin-colors duration-500 mt-6`
            }    
          >
            + Add note
          </div>

          <div className={`${!isNoteInputOpen && "hidden"} mt-5`}>
            <div className={`
                ${activeTimer === "pomodoro" && "text-pomodoro"}
                ${activeTimer === "shortBreak" && "text-shortBreak"}
                ${activeTimer === "longBreak" && "text-longBreak"}`
              }
            >
              Task note:
            </div>

            <textarea 
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
              border rounded-md transition-colors duration-500 px-2 py-1`
            }
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
              hover:brightness-[0.95]`
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