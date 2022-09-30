import React from "react";

// Componetns
import Setting from "./Setting";

// Redux
import { useSelector } from "react-redux";

const Header = () => {

  const timerState = useSelector(state => state.timerState)

  const { activeTimer } = timerState.time

  return (
    <header className="flex justify-between items-center">
      <div className="transition duration-500 dark:opacity-0">
        <i className={`
            ${activeTimer === "pomodoro" && "text-pomodoro"}
            ${activeTimer === "shortBreak" && "text-shortBreak"}
            ${activeTimer === "longBreak" && "text-longBreak"}
            text-header bg-white rounded-full text-center
            fa-solid fa-check mr-1 p-small
          `}
        >  
        </i>
        <span className="text-header font-semibold">
          PomoFocus
        </span>
      </div>

      <nav className="flex items-center">
        <Setting />
      </nav>
    </header>
  );
};

export default Header;