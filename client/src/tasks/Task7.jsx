import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { moveForwards, moveBackwards, moveForwardsRoute, moveBackwardsRoute, moveBackwardsMobile, moveBackwardsRouteMobile, moveForwardsMobile, moveForwardsRouteMobile } from "../redux/reducers/moveActions";
import { moveTrue, moveFalse } from "../redux/reducers/canMove";
import { addMove } from "../redux/reducers/movesNumber";
import X from "../assets/X.svg";
import O from "../assets/O.svg";
import "../App.css";
import { useMediaQuery } from "react-responsive";

export const Task7 = () => {
  // Task Default Actions
  let timeLimit = 10000; // milliseconds

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  
  const [success, setSuccess] = useState(false);
  const [playerMoves, setPlayerMoves] = useState([1,2,3,4,5,6,7,8,9]);
  const [clicked, setClicked] = useState([]);
  const [canClick, setCanClick] = useState(true);
  const [win, setWin] = useState(false);

  const handleClick = (num) => {
    if (!win) {
      setCanClick(state => !state);
      setClicked((state) => [...state, num]);
      setPlayerMoves((state) => state.filter((val) => val != num));
    }
  }

  //Redux Dispatch
  const dispatch = useDispatch();

  const handleWin = () => {
    //Changes Success State On Completion
    setSuccess((prevState) => !prevState);
    //Redux Actions
    dispatch(moveTrue());
    isNotDesktop ? dispatch(moveForwardsMobile()) : dispatch(moveForwards());
    isNotDesktop
      ? dispatch(moveForwardsRouteMobile())
      : dispatch(moveForwardsRoute());
    dispatch(addMove());
  };

  const handleLose = () => {
    dispatch(moveTrue());
    isNotDesktop ? dispatch(moveBackwardsMobile()) : dispatch(moveBackwards());
    isNotDesktop
      ? dispatch(moveBackwardsRouteMobile())
      : dispatch(moveBackwardsRoute());
  }

  //Task Timer Callback
  useEffect(() => {
    dispatch(moveFalse());
    let filteredArray = clicked.filter((_, index) => index % 2 === 0);
    if (clicked.length >= 5) {
      if (
        // Horizontal Checks
        (filteredArray.includes(1) &&
          filteredArray.includes(2) &&
          filteredArray.includes(3)) ||
        (filteredArray.includes(4) &&
          filteredArray.includes(5) &&
          filteredArray.includes(6)) ||
        (filteredArray.includes(7) &&
          filteredArray.includes(8) &&
          filteredArray.includes(9)) ||
        // In-Between
        (filteredArray.includes(1) &&
          filteredArray.includes(5) &&
          filteredArray.includes(9)) ||
        (filteredArray.includes(3) &&
          filteredArray.includes(5) &&
          filteredArray.includes(7)) ||
        // Vertical Checks
        (filteredArray.includes(1) &&
          filteredArray.includes(4) &&
          filteredArray.includes(7)) ||
        (filteredArray.includes(2) &&
          filteredArray.includes(5) &&
          filteredArray.includes(8)) ||
        (filteredArray.includes(3) &&
          filteredArray.includes(6) &&
          filteredArray.includes(9))
      ) {
        setWin(true);
        handleWin();
      }
    } else if (clicked.length >= 9) {
      handleLose();
    }

    if (!success) {
      var timerr = setTimeout(() => {
        handleLose();
      }, timeLimit);
    } else {
      clearTimeout(timerr);
    }
    return () => {
      clearTimeout(timerr);
    };
  }, [moveTrue, moveBackwards, dispatch, timeLimit, clicked]);

  return (
    <>
      <div className="h-screen bg-black bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <div className="w-[934px] scale-[.9] md:scale-100 grid pop-up bg-[#D9D9D9] h-[506px]">
          <div className="absolute h-4 bg-[#665A48] hidden md:block progress-div-long"></div>
          <div className="relative w-screen m-auto mt-0 h-4 bg-[#665A48] md:hidden mobile-progress-div-long"></div>
          <div className="gap-12 flex flex-col items-center mt-4">
            <h2 className="text-5xl font-extrabold">Beat the AI</h2>
            <div className="flex w-[265px] flex-wrap">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  onClick={() => {
                    if (!clicked.includes(index + 1) && canClick) {
                      handleClick(index + 1);
                      let x = playerMoves.filter((val) => val != index + 1)[
                        Math.floor(
                          Math.random() *
                            playerMoves.filter((val) => val != index + 1).length
                        )
                      ];
                      setTimeout(() => {
                        handleClick(x);
                      }, 100);
                    }
                  }}
                  className="w-20 h-20 border-4 border-[#161616] flex justify-center items-center m-1"
                >
                  <img
                    src={(clicked.indexOf(index + 1) + 1) % 2 == 0 ? O : X}
                    id={`tic-box-${index + 1}`}
                    style={{
                      display: clicked.includes(index + 1) ? "inline" : "none",
                    }}
                    className="w-10"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
