import React from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { NEXT_PAGE, PREV_PAGE, CHANGE_PAGE } from "../../redux/pagiantion/paginationActions";

// MUI Icons
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Pagination = () => {
  // Pagination state
  const paginationState = useSelector((state) => state.paginationState);

  const { currentPage, pagesCount, paginationBtns } = paginationState;

  const dispatch = useDispatch();

  // To change pagination page
  const changePage = (action, btn) => {
    dispatch(action);

    // To fix scroll to top bug
    if (btn === "PREV" && currentPage !== 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (btn === "NEXT" && currentPage !== pagesCount) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (btn === "NUMBER") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* PREV-BTN */}
      <button
        onClick={() => changePage(PREV_PAGE(), "PREV")}
        className={`${currentPage === 1 && "opacity-50 cursor-default"}
            flex items-center justify-center border border-amber-300 rounded-full 
            transition duration-100 hover:opacity-70 active:scale-90 mr-1 w-7 h-7`
        }
      >
        <ArrowBackIosNewIcon sx={{padding: "3px"}} />
      </button>

      {/* Number-BTNS */}
      {paginationBtns.map(btn => (
        <button
          key={btn}
          onClick={() => changePage(CHANGE_PAGE(btn), "NUMBER")}
          className={`${currentPage === btn ? "bg-amber-300 text-black" : "text-amber-300"}
                border border-amber-300 text-lg rounded-full transition duration-100
                hover:opacity-70 active:scale-90 mx-1 w-7 h-7`
          }
        >
          {btn}
        </button>
      ))}

      {/* NEXT-BTN */}
      <button
        onClick={() => changePage(NEXT_PAGE(), "NEXT")}
        className={`${currentPage === pagesCount && "opacity-50 cursor-default"}
            flex items-center justify-center border border-amber-300 rounded-full
            transition duration-100 hover:opacity-70 active:scale-90 ml-1 w-7 h-7`}
      >
        <ArrowForwardIosIcon sx={{padding: "3px"}} />
      </button>
    </>
  );
};

export default Pagination;