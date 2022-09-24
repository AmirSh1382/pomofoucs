import React, { useEffect } from "react";

// React-router-dom
import { useNavigate } from "react-router-dom";
// Redux
import { useSelector } from "react-redux";

const AboutProject = () => {
  const navigate = useNavigate();

  const coinsState = useSelector(state => state.coinsState);

  useEffect(() => {
    !coinsState.coins.length && navigate("/");

    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-fit mx-auto w-full my-16 px-2 md:px-12">
      <div>
        <div className="text-amber-300 font-semibold">
          Project Tech Stack and Utilities :
        </div>
        <div className="flex flex-col text-sm pl-4">
          <span className="mt-1">React Js</span>
          <span className="mt-1">Tailwind CSS</span>
          <span className="mt-1">Pure CSS</span>
          <span className="mt-1">Material Icons</span>
          <span className="mt-1">React hooks</span>
          <span className="mt-1">Redux state manager - React Redux</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-amber-300 font-semibold">
          API :
        </div>
        <div className="text-sm pl-4 mt-1">
          Coingecko API - 
          &nbsp;
          <a 
            className="text-amber-300 inline hover:underline"
            href="https://www.coingecko.com"
          >
            Click to Navigate
          </a>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-amber-300 font-semibold">
          Developer :
        </div>

        <div className="pl-4">
          <div className="mt-3">
            <span className="text-gray-400 font-semibold">Fullname:</span>
            <span> Amir Shafikhani</span>
          </div>

          <div className="mt-3">
            <div className="text-gray-400 font-semibold">Education:</div>
            <div>Computer Engineering Student</div>
          </div>
        </div>

        <div className="pl-4 mt-3">
          <div className="text-gray-400 font-semibold">
            Skills:            
          </div>
          <div className="flex flex-col text-sm pl-3">
            <span className="mt-1">HTML 5</span>
            <span className="mt-1">CSS 3</span>
            <span className="mt-1">Bootstrap 5</span>
            <span className="mt-1">Tailwind Css</span>
            <span className="mt-1">JavaScript</span>
            <span className="mt-1">Material UI</span>
            <span className="mt-1">React Js</span> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;