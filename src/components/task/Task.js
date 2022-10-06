import React, { useRef } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { changeFinishedStatus, setTaskActive, deleteTaskAction, changeFormStatus } from "../../redux/task/taskActions";

const Task = (props) => {
  const { setTaskValue, setTimeValue, setNoteValue, taskInputRef, taskFormRef } = props;
  const { id, title, time, note, selected, finished } = props;

  const dispatch = useDispatch();

  const timerState = useSelector(state => state.timerState);
  const { activeTimer } = timerState.time;

  const finishedIconRef = useRef();
  const editIconRef = useRef();

  const clickHandler = e => {
    if (finishedIconRef.current.contains(e.target)) {
      dispatch(changeFinishedStatus(id));
    } else if (editIconRef.current.contains(e.target)) {
      const confirmation = taskInputRef.current.value ? 
        window.confirm("The input data will be lost. Are you sure you want to close it?")
        : true;

      if (confirmation) {
        setTaskValue(title);
        time && setTimeValue(time);
        note && setNoteValue(note);
        dispatch(deleteTaskAction(id));

        dispatch(changeFormStatus(true, note ? true : false ));

        taskInputRef.current.focus();

        setTimeout(() => {
          taskFormRef.current.scrollIntoView({behavior: "smooth", block: "start"});
        }, 50);
      }
    } else {
      e.target.scrollIntoView({ behavior: "smooth", block: "center" });
      
      dispatch(setTaskActive(id));
    }
  };

  return (
    <div
      onClick={e => clickHandler(e)}
      className={`
        ${selected ? "before:opacity-1 translate-y-[3px]" : "before:opacity-0 hover:before:opacity-60"}
        before:content-[""] before:absolute before:left-0 before:top-1/2
        before:-translate-y-1/2 before:h-full before:w-1 before:bg-black
        bg-white relative text-black rounded-md px-3 py-4 cursor-pointer overflow-hidden`}
    >
      <div className="flex gap-2 items-center">
        <i
          ref={finishedIconRef}
          className={`
            ${activeTimer === "pomodoro" && "text-pomodoro"}
            ${activeTimer === "shortBreak" && "text-shortBreak"}
            ${activeTimer === "longBreak" && "text-longBreak"}  
            ${!finished && "opacity-50"}
            bi bi-check-circle-fill transition-colors duration-500 text-xl`}
        ></i>

        <div className="grow overflow-hidden text-ellipsis">{title}</div>

        {time && <span className="text-muted">{time}min</span>}

        <i ref={editIconRef} className="bi bi-pencil-square text-xl"></i>
      </div>

      { 
        note && (
          <div className="bg-amber-50 rounded shadow text-ellipsis overflow-hidden ml-7 mt-3 p-2">
            {note}
          </div>
        )
      }
    </div>
  );
};

export default Task;