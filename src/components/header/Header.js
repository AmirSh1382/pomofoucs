import React from "react";

// Componetns
import Setting from "./Setting";

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

      <nav className="flex items-center">
        <Setting />
      </nav>
    </header>
  );
};

export default Header;