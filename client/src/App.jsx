// Assets Imports
import Dune1 from "./assets/Dune1.svg";
import Dune2 from "./assets/Dune2.svg";
import Checkpoint from "./assets/Checkpoint.svg";
import Endpoint from "./assets/Endpoint.svg";
//  Dependencies
import "./App.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
// Redux Functions Import
import { useSelector, useDispatch } from "react-redux";
// Redux Actions Imports
import {
  moveForwards,
  moveBackwards,
  moveForwardsRoute,
  moveBackwardsRoute,
  /* Movement Mobile */
  moveForwardsMobile,
  moveBackwardsMobile,
  moveForwardsRouteMobile,
  moveBackwardsRouteMobile,
  /* Checkpoints */
  restartFromPol1,
  restartFromPol2,
  restartFromZero,
  restartRouteFromZero,
  restartRouteFromPol1,
  restartRouteFromPol2,
  /* Checkpoints Mobile */
  restartFromPol1Mobile,
  restartRouteFromPol1Mobile,
  restartFromPol2Mobile,
  restartRouteFromPol2Mobile,
} from "./redux/reducers/moveActions";
import {
  subtractMove,
  resetMoves,
} from "./redux/reducers/movesNumber";
// Tasks Imports
import { Task1 } from "./tasks/Task1";
import { Task2 } from "./tasks/Task2";
import { Task3 } from "./tasks/Task3";
import { Task4 } from "./tasks/Task4";
import { Task5 } from "./tasks/Task5";
import { Task6 } from "./tasks/Task6";
import { Task7 } from "./tasks/Task7";
// Restart Import
import { Congrats } from "./tasks/Congrats";

import { Winners } from "./Winners";

function App() {

  useEffect(() => {
    (async() => {
      await fetch("https://cubigoal.netlify.app/ping", {
        method: "GET"
      })
    })()
  }, [])

  const [light, setLight] = useState(true);
  const [winnersToggle, setWinnersToggle] = useState(false);

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)"
  })

  const canMove = useSelector((state) => state.movability.value);
  const moves = useSelector((state) => state.moves.value);
  const numberofmoves = useSelector((state) => state.numberOfMoves.value);
  const routeMoves = useSelector((state) => state.moves.routeValue);

  const restartGame = () => {
    switch (true) {
      case moves < 626:
        dispatch(restartFromZero());
        dispatch(restartRouteFromZero());
        break;
      case moves > 970:
        dispatch(restartFromPol2());
        dispatch(restartRouteFromPol2());
        break;
      default:
        dispatch(restartFromPol1());
        dispatch(restartRouteFromPol1());
        break;
    }
    dispatch(resetMoves());
  };

  const restartGameMobile = () => {
    switch (true) {
      case moves < 164:
        dispatch(restartFromZero());
        dispatch(restartRouteFromZero());
        break;
      case moves > 244:
        dispatch(restartFromPol2Mobile());
        dispatch(restartRouteFromPol2Mobile());
        break;
      default:
        dispatch(restartFromPol1Mobile());
        dispatch(restartRouteFromPol1Mobile());
        break;
    }
    dispatch(resetMoves());
  };

  const toggleWinners = () => {
    setWinnersToggle((value) => !value);
  };

  const dispatch = useDispatch();

  const playerMoveForwards = () => {
    dispatch(moveForwards());
    dispatch(moveForwardsRoute());
    dispatch(subtractMove());
  };
  const playerMoveBackwards = () => {
    dispatch(moveBackwards());
    dispatch(moveBackwardsRoute());
    dispatch(subtractMove());
  };

  const playerMoveForwardsMobile = () => {
    dispatch(moveForwardsMobile());
    dispatch(moveForwardsRouteMobile());
    dispatch(subtractMove());
  };
  const playerMoveBackwardsMobile = () => {
    dispatch(moveBackwardsMobile());
    dispatch(moveBackwardsRouteMobile());
    dispatch(subtractMove());
  };

  return (
    <>
      <main
        style={{
          backgroundColor: light ? "#F1C27B" : "#2C2C2C",
          height: "100vh"
        }}
      >
        {/* Background */}
        <div className="relative z-[0] top-[100vh]">
          <img
            style={{ filter: light ? "" : "grayscale(30%) brightness(0.3)" }}
            src={Dune1}
            className="absolute bottom-0"
            alt="background-dune"
          />
          <img
            style={{ filter: light ? "" : "grayscale(30%) brightness(0.3)" }}
            src={Dune2}
            className="absolute right-0 bottom-0"
            alt="background-dune"
          />
        </div>
        {/* Theme Toggle */}
        <div
          id="themeToggle"
          onClick={() => setLight((t) => !t)}
          style={{ backgroundColor: light ? "#FFD89C" : "white" }}
          className="w-20 h-20 rounded-full relative top-12 left-12 md:left-40 cursor-pointer"
        ></div>
        <button
          onClick={toggleWinners}
          style={{
            boxShadow: "7px 7px 0px black",
            border: "3px solid black",
          }}
          className="w-44 py-4 top-8 font-bold text-2xl bg-white absolute right-16 text-center"
        >
          WINNERS
        </button>
        {winnersToggle && <Winners toggle={toggleWinners} />}
        {/* Title - CUBIGOAL */}
        <div className="w-[38.8125rem] md:hidden h-56"></div>
        <figure
          id="title"
          style={{
            backgroundColor: light ? "#C38154" : "#2C2C2C",
            boxShadow: `21px 16px 0px 0px ${light ? "#2C2C2C" : "#D9D9D9"}`,
            borderColor: light ? "#2C2C2C" : "#D9D9D9",
          }}
          className="w-[38.8125rem] font-extrabold h-[9.875rem] hidden md:grid place-content-center border-[7px] box-content z-50 relative m-auto mt-12"
        >
          <figcaption
            className="text-8xl"
            style={{
              color: light ? "#F9E0BB" : "white",
              filter: "drop-shadow(5px 6px 0px rgba(0, 0, 0, 0.25))",
            }}
          >
            CUBIGOAL
          </figcaption>
        </figure>
        {/* Player */}
        <div
          id="player"
          style={{
            left: moves + "px",
          }}
          className="w-fit flex relative mt-[8.4rem] flex-col z-50 justify-center items-center"
        >
          <div className="w-[84px] z-[2] h-[84px] bg-white"></div>
          <div className="h-2 absolute mt-[5.4rem] w-[100px] bg-black opacity-25"></div>
        </div>
        <div
          style={{
            filter: light ? "" : "grayscale(100%) brightness(0.4)",
            left: routeMoves + "px",
          }}
          id="route"
          className="flex absolute top-[31rem]"
        >
          <img
            src={Checkpoint}
            className="absolute bottom-4 left-[60rem]"
            alt="checkpoint"
          />
          <img
            src={Checkpoint}
            className="absolute bottom-4 left-[94rem]"
            alt="checkpoint"
          />
          <img
            src={Endpoint}
            className="absolute bottom-4 left-[136rem]"
            alt="checkpoint"
          />
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i + 1}
              style={{
                backgroundColor: (i + 1) % 2 === 0 ? "#9F8772" : "#665A48",
              }}
              className="w-[8.47769rem] h-[2.625rem] bg-black"
            ></div>
          ))}
        </div>
        <div className="w-fit m-auto space-y-4">
          <div className="flex flex-col md:flex-row justify-center mt-12 gap-4">
            <button
              onClick={() => {
                if (canMove && numberofmoves > 0 && moves > 24)
                  isNotDesktop
                    ? playerMoveBackwardsMobile()
                    : playerMoveBackwards();
              }}
              style={{
                display: numberofmoves != 0 ? "block" : "none",
                backgroundColor: light ? "#D9D9D9" : "#2C2C2C",
                color: light ? "#2C2C2C" : "#D9D9D9",
                boxShadow: `10px 8px 0px 0px ${light ? "#2C2C2C" : "#D9D9D9"}`,
              }}
              className="text-[2rem] pop-up order-2 font-extrabold relative w-[18.75rem] h-[3.75rem]"
            >
              &lt;&lt; MOVE
            </button>
            <button
              onClick={() => {
                if (canMove && numberofmoves > 0 && moves < 1315)
                  isNotDesktop
                    ? playerMoveForwardsMobile()
                    : playerMoveForwards();
              }}
              style={{
                display: numberofmoves != 0 ? "block" : "none",
                backgroundColor: light ? "#D9D9D9" : "#2C2C2C",
                color: light ? "#2C2C2C" : "#D9D9D9",
                boxShadow: `10px 8px 0px 0px ${light ? "#2C2C2C" : "#D9D9D9"}`,
              }}
              className="text-[2rem] pop-up md:order-2 font-extrabold relative w-[18.75rem] h-[3.75rem]"
            >
              MOVE &gt;&gt;
            </button>
          </div>
          <button
            onClick={isNotDesktop ? restartGameMobile : restartGame}
            style={{
              display: numberofmoves <= 0 ? "block" : "none",
              backgroundColor: light ? "#D9D9D9" : "#2C2C2C",
              color: light ? "#2C2C2C" : "#D9D9D9",
              boxShadow: `10px 8px 0px 0px ${light ? "#2C2C2C" : "#D9D9D9"}`,
            }}
            className="text-[2rem] pop-up player-btn font-extrabold relative w-[18.75rem] h-[3.75rem]"
          >
            RESTART
          </button>
        </div> {/* 164 + -812 Pol1, 244 + -1276 Pol2 */}
        {(moves == 196 || moves == 64) && numberofmoves > 0 ? <Task1 /> : ""}
        {(moves == 368 || moves == 104) && numberofmoves > 0 ? <Task2 /> : ""} 
        {(moves == 540 || moves == 144) && numberofmoves > 0 ? <Task3 /> : ""} 
        {(moves == 712 || moves == 184) && numberofmoves > 0 ? <Task4 /> : ""} 
        {(moves == 884 || moves == 224) && numberofmoves > 0 ? <Task5 /> : ""} 
        {(moves == 1056 || moves == 264) && numberofmoves > 0 ? <Task6 /> : ""} 
        {(moves == 1228 || moves == 304) && numberofmoves > 0 ? <Task7 /> : ""} 
        {(moves == 1400 || moves == 344) && numberofmoves > 0 ? <Congrats /> : ""} 
        <p
          style={{ filter: "drop-shadow(0px 4px 0px rgba(0, 0, 0, 0.25))" }}
          className="absolute text-5xl font-extrabold text-white right-0 top-[25rem] sm:top-[28rem] mr-4 "
        >
          MOVES <br className="sm:hidden" />
          LEFT: {numberofmoves}
        </p>
      </main>
    </>
  );
}

export default App;
