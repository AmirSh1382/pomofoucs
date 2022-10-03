import React, { useRef, useState } from "react";

const TaskHeader = () => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false)

  const optionsRef = useRef()
  const iconRef = useRef()

  document.addEventListener("click", e => {
    e.target !== optionsRef.current && e.target !== iconRef.current && 
    setIsMenuOpen(false)

    document.removeEventListener("click", document)
  })

  return (
    <div className="text-center text-lg mt-8">
      <div>#0</div>
      <div>time to focus!</div>
      <div className="flex relative items-center justify-between py-3 border-b-2 dark:invisible">
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
            absolute top-full rounded overflow-hidden -translate-y-1 right-0 bg-white text-black shadow-xl mb-3`
          }
        >
          <ul className="text-start cursor-pointer text-base [&>li]:py-2 [&>li]:px-3">
            <li className="hover:bg-neutral-200">
              <i className="bi bi-check2-circle text-xl mr-2"></i>
              <span>Clear finished tasks</span>
            </li>
            <li className="hover:bg-neutral-200">
              <i className="bi bi-check-all text-xl mr-2"></i>
              <span>Check all tasks</span>
            </li>
            <li className="hover:bg-neutral-200">
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