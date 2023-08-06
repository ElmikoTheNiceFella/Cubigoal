import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { moveForwards, moveBackwards, moveForwardsRoute, moveBackwardsRoute, moveBackwardsMobile, moveBackwardsRouteMobile, moveForwardsMobile, moveForwardsRouteMobile } from "../redux/reducers/moveActions";
import { moveTrue, moveFalse } from "../redux/reducers/canMove";
import { addMove } from "../redux/reducers/movesNumber";
import Cup from "../assets/Cup1.svg";
import "../App.css";
import "./cups.css";
import { useMediaQuery } from "react-responsive";

export const Task6 = () => {
  // Task Default Actions
  let timeLimit = 10000; // milliseconds

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  
  const [success, setSuccess] = useState(false);
  const [randomValue, setRandomValue] = useState("a");
  const [canInput, setCanInput] = useState(false);

  //Redux Dispatch
  const dispatch = useDispatch();

  const handleClick = () => {
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
    setRandomValue(["a", "b"][Math.floor(Math.random() * 2)]);
    dispatch(moveFalse());
    setTimeout(() => {
      setCanInput(true);
    }, 5000)
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
  }, [moveTrue, moveBackwards, dispatch, timeLimit]);

  return (
    <>
      <div className="h-screen bg-black bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <div className="w-[934px] scale-[.9] md:scale-100 grid pop-up bg-[#D9D9D9] h-[506px]">
          <div className="absolute h-4 bg-[#665A48] hidden md:block progress-div-long"></div>
          <div className="relative w-screen m-auto mt-0 h-4 bg-[#665A48] md:hidden mobile-progress-div-long"></div>
          <div className="gap-24 flex flex-col items-center mb-16">
            <h2 className="text-5xl font-extrabold">Find the ball</h2>
            <div className="flex flex-col items-center">
              <div className="flex relative z-10 gap-[66px]">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    id={`cup-${i + 1}`}
                    className={`cup ${canInput ? "cup-hover" : ""}`}
                    style={{
                      animation: `cup-${i + 1}-${randomValue} 5s`,
                    }}
                    onClick={() => {
                      if (i === 1 && canInput) {
                        handleClick();
                      } else if (i !== 1 && canInput) {
                        handleLose();
                      }
                    }}
                  >
                    <img
                      src={Cup}
                      alt=""
                      className="w-28 relative z-10"
                      key={i}
                    />
                    <div
                      style={{
                        display: i === 1 ? "block" : "none",
                      }}
                      className="w-5 h-5 rounded-full absolute bottom-0 left-10 bg-[#91B89D]"
                    ></div>
                  </div>
                ))}
              </div>
              <div className="w-[30rem] h-2 relative bottom-1 bg-black opacity-25"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
