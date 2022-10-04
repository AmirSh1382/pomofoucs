import React, { useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { changeFinishedStatus, setTaskActive } from "../../redux/task/taskActions";

const Task = ({ id, title, time, note, selected, finished }) => {
  const dispatch = useDispatch()

  const timerState = useSelector(state => state.timerState)
  const { activeTimer } = timerState.time

  const finishedIconRef = useRef()
  const editIconRef = useRef()

  const clickHandler = e => {
    if (finishedIconRef.current.contains(e.target)) {
      dispatch(changeFinishedStatus(id))
    } else if (editIconRef.current.contains(e.target)) {
      console.log("edit");
    } else {
      dispatch(setTaskActive(id))
    }
  }

  return (
    <div 
      onClick={e => clickHandler(e)}
      className={`
        ${selected ? "before:opacity-1 translate-y-[3px]" : "before:opacity-0 hover:before:opacity-60"}
        before:content-[""] before:absolute before:left-0 before:top-1/2
        before:-translate-y-1/2 before:h-full before:w-1 before:bg-black
        bg-white relative text-black rounded-md px-3 py-4 cursor-pointer overflow-hidden`
      }
    >
      <div className="flex gap-2 items-center">
        <i
          ref={finishedIconRef}
          className={`
            ${activeTimer === "pomodoro" && "text-pomodoro"}
            ${activeTimer === "shortBreak" && "text-shortBreak"}
            ${activeTimer === "longBreak" && "text-longBreak"}  
            ${!finished && "opacity-50"}
            bi bi-check-circle-fill transition-colors duration-500 text-xl`
          }
        >
        </i>

        <div className="grow overflow-hidden">
          {title}
        </div>

        {
          time && (
            <span className="text-muted">
              {time}min
            </span>
          )
        }

        <i
          ref={editIconRef} 
          className="bi bi-pencil-square text-xl">
        </i>
      </div>

      {
        note && (
          <div className='bg-amber-50 rounded shadow ml-7 mt-3 p-2'>
            {note}
          </div>
        )
      }
    </div>
  );
};

export default Task;