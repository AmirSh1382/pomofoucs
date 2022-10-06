import React, { useState } from "react";

// Redux
import { useSelector } from "react-redux"; 

const Info = () => {
  const [ isInfoOpen, setIsInfoOpen ] = useState(false);

  const timerState = useSelector(state => state.timerState)
  const { activeTimer } = timerState.time

  return (
    <>
      <button
        onClick={() => setIsInfoOpen(true)}
        className="bg-primary rounded transition active:translate-y-1 px-2 py-1"
      >
        <i className="bi bi-info-circle"></i>
        <span className="hidden sm:inline ml-1">About</span>
      </button>

      <div
        className={`${isInfoOpen ? "backdrop-blur-sm -translate-y-0" : "-translate-y-full"}
        fixed top-0 left-0 w-full min-h-full flex items-center justify-center transition duration-500 z-10`}
      >
        <div className="rounded-md bg-white text-black shadow-lg w-full max-w-md divide-y px-5 py-4 m-3">
          <div className="flex justify-between items-center mb-3">
            <div className="text-muted text-lg">
              About Project
            </div>
            <div onClick={() => setIsInfoOpen(false)} className="cursor-pointer">
              <i className="bi bi-x-lg text-xl opacity-60 hover:opacity-100"></i>
            </div>
          </div>

          <div className="py-3">
            <div className="text-lg">
              Project Tech Stack and Utilities :
            </div>
            <div className="flex flex-col gap-y-1 text-sm pl-2 mt-1">
              <span>React Js</span>
              <span>Tailwind CSS</span>
              <span>Pure CSS</span>
              <span>Bootstrap Icons</span>
              <span>React hooks</span>
            </div>
          </div>

          <div className="py-3">
            <div className="text-lg">
              Design :
            </div>
            <div className="pl-2 mt-1">
              <span>
                Pomofocus web clone - 
              </span>
              &nbsp;
              <a 
                className={`
                  ${activeTimer === "pomodoro" && "text-pomodoro"}
                  ${activeTimer === "shortBreak" && "text-shortBreak"}
                  ${activeTimer === "longBreak" && "text-longBreak"}`
                }
                href="https://pomofocus.io/app"
                target="blank"
              >
                Click to navigate
              </a>
            </div>
          </div>

          <div className="pt-3">
            <div className="text-lg">
              Developer:
            </div>
            <div 
              className={`
                ${activeTimer === "pomodoro" && "text-pomodoro"}
                ${activeTimer === "shortBreak" && "text-shortBreak"}
                ${activeTimer === "longBreak" && "text-longBreak"}
                font-semibold pl-2 mt-1`
              }
            >
              Amir Shafikhani
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Info;