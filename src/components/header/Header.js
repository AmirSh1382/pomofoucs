import React from "react";

// Componetns
import Setting from "./Setting";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div className="text-xl sm:text-2xl font-semibold">
        PomoFocus
      </div>

      <nav className="flex items-center">
        <Setting />
      </nav>
    </header>
  );
};

export default Header;