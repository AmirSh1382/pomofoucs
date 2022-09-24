import React, { useState } from "react";

// Components
import Header from "./Header";
import Footer from "./Footer";

// MUI Icons
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Layout = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);

  const [ minHeight, setMinHeight ] = useState(visualViewport.height + "px")

  window.addEventListener("scroll", () => {
    setScrollY(window.scrollY);
  });

  // To avoid scrolling in opera browser in mobile 
  window.addEventListener("resize" , () => {
    setMinHeight(visualViewport.height + "px")
  })

  return (
    <div style={{minHeight: `${minHeight}`}} className="flex flex-col">
      <Header />
      {children}
      <Footer />

      {/* to show scroll to top btn based on scrollY */}
      {scrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-9 left-8 rounded-full bg-amber-300 text-zinc-900
            w-9 h-9 cursor-pointer active:scale-75 transition duration-100"
        >
          <KeyboardArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default Layout;