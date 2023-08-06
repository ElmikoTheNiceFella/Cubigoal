import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { moveForwards, moveBackwards, moveForwardsRoute, moveBackwardsRoute, moveForwardsMobile, moveForwardsRouteMobile, moveBackwardsMobile, moveBackwardsRouteMobile } from "../redux/reducers/moveActions"
import { moveTrue, moveFalse } from '../redux/reducers/canMove'
import { addMove } from '../redux/reducers/movesNumber'
import SubmitArrow from "../assets/Submit-Arrow.svg"
import ClockBG from "../assets/ClockBG.svg";
import "../App.css"
import { useMediaQuery } from "react-responsive";

export const Task2 = () => {
  // Task Default Actions
  let timeLimit = 7000; // milliseconds

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const [rotation, setRotation] = useState(0);
  const [success, setSuccess] = useState(false);
  const [random, setRandom] = useState(0);

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

  const timer = setInterval(() => {
    if (rotation > 360) {
      setRotation(0)
    } else {
      setRotation(r => r+2)
    }
    if (rotation > (90 + random) && rotation < (180 + random)) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
    clearInterval(timer)
  }, 1);

  /* Task Timer Callback */

  useEffect(() => {
    dispatch(moveFalse());
    setRandom(Math.floor(Math.random() * 180));
    
    if(!success) {
      var timerr = setTimeout(() => {
        dispatch(moveTrue())
        isNotDesktop
          ? dispatch(moveBackwardsMobile())
          : dispatch(moveBackwards());
        isNotDesktop
          ? dispatch(moveBackwardsRouteMobile())
          : dispatch(moveBackwardsRoute());
      }, timeLimit)
    } else {
        clearTimeout(timerr)
    }

    return () => {
        clearTimeout(timerr)
    }
  }, [moveTrue, moveBackwards, dispatch, timeLimit])

  return (
    <>
      <div className="h-screen bg-black bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <div className="md:w-[934px] w-screen grid pop-up place-content-center bg-[#D9D9D9] h-[506px]">
          <div className="absolute h-4 bg-[#665A48] hidden md:block progress-div"></div>
          <div className="absolute h-4 bg-[#665A48] md:hidden mobile-progress-div"></div>
          <div className="gap-16 flex flex-col items-center mb-32">
            <h2 className="text-4xl w-[90%] font-extrabold text-center">
              Submit when the arrow reaches the yellow part
            </h2>
            <div className="scale-150 w-fit flex justify-center items-center">
              <img
                style={{ rotate: random + "deg" }}
                src={ClockBG}
                className="w-[109px] z-0 relative"
                alt="clock-bg"
              />
              <div className="w-4 h-4 absolute rounded-full flex justify-center bg-black">
                <div
                  style={{ rotate: rotation + "deg", backgroundColor: "black" }}
                  className="w-1 h-[3.4rem] bg-black origin-bottom bottom-[2.8rem] flex justify-center relative"
                >
                  <div
                    id="clockArrow"
                    className="w-3 h-3 bg-black absolute rotate-45"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* Submit On Task Success */}
          <button
            onClick={() => {
              if (success) handleClick();
            }}
            className="bg-[#C38154] submitBtn text-black font-extrabold flex items-center justify-center mt-96 absolute right-24 w-52 gap-4 h-14 text-3xl"
          >
            Submit <img src={SubmitArrow} className="w-9" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
}