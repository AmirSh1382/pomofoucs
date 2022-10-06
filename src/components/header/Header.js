import React from "react";

// Componetns
import Setting from "./Setting";
import Info from "./Info";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="transition duration-500 dark:opacity-0">
        {/* Setting-icon */}
        <i className='bi bi-check-circle-fill text-xl mr-1'></i>
        <span className="text-header font-semibold">
          PomoFocus
        </span>
      </div>

      <nav className="flex items-center gap-x-2">
        <Info />
        <Setting />
      </nav>
    </header>
  );
};

export default Header;