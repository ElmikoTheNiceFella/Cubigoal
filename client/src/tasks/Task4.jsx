import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  moveForwards,
  moveBackwards,
  moveForwardsRoute,
  moveBackwardsRoute,
  moveBackwardsMobile,
  moveBackwardsRouteMobile,
  moveForwardsRouteMobile,
  moveForwardsMobile,
} from "../redux/reducers/moveActions";
import { moveTrue, moveFalse } from "../redux/reducers/canMove";
import { addMove } from "../redux/reducers/movesNumber";
import SubmitArrow from "../assets/Submit-Arrow.svg";
import "../App.css";
import { useMediaQuery } from "react-responsive";

export const Task4 = () => {
  // Task Default Actions
  let timeLimit = 7000; // milliseconds

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const [success, setSuccess] = useState(false);
  const [invis1, setInvis1] = useState("");
  const [invis2, setInvis2] = useState("");
  
  //Target Number
  const [randomVal, setRandomVal] = useState(0);

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
    setRandomVal([2, 3, 5][Math.floor(Math.random() * 3)]);
    dispatch(moveFalse());

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
        <div className="md:w-[934px] w-[800px] grid pop-up  bg-[#D9D9D9] h-[506px]">
          <div className="relative h-4 bg-[#665A48] hidden md:block progress-div"></div>
          <div className="relative w-screen m-auto mt-0 h-4 bg-[#665A48] md:hidden mobile-progress-div"></div>
          <div className="gap-24 flex flex-col items-center mb-64">
            <h2 className="text-5xl font-extrabold">
              Make the 8 a {randomVal}
            </h2>
            <div className="flex justify-center w-56">
              <div className="bg-black z-[4] absolute w-28 h-4 top-[10.5rem] rounded-full number"></div>
              <div
                onClick={() => {
                  if (randomVal == 2 || randomVal == 3)
                    setInvis1((t) => (t == "transparent" ? "" : "transparent"));
                }}
                style={{
                  backgroundColor:
                    randomVal == 2 || randomVal == 3 ? invis1 : "",
                }}
                className="bg-black w-20 h-4 rounded-full left-[19rem] md:left-[23.5rem] absolute rotate-90 number"
              ></div>
              <div
                onClick={() => {
                  if (randomVal == 5)
                    setInvis1((t) => (t == "transparent" ? "" : "transparent"));
                }}
                style={{
                  backgroundColor: randomVal == 5 ? invis1 : "",
                }}
                className="bg-black w-20 absolute h-4 rounded-full right-[19rem] md:right-[23.5rem] rotate-90 number"
              ></div>
              <div className="bg-black w-28 z-[4] absolute h-4 top-[15.2rem] rounded-full number"></div>
              <div
                onClick={() => {
                  if (randomVal == 2)
                    setInvis2((t) => (t == "transparent" ? "" : "transparent"));
                }}
                style={{ backgroundColor: randomVal == 2 ? invis2 : "" }}
                className="bg-black w-28 top-[18.5rem] absolute h-4 rounded-full right-[18rem] md:right-[22.5rem] number rotate-90"
              ></div>
              <div
                onClick={() => {
                  if (randomVal == 3 || randomVal == 5)
                    setInvis2((t) => (t == "transparent" ? "" : "transparent"));
                }}
                style={{
                  backgroundColor:
                    randomVal == 3 || randomVal == 5 ? invis2 : "",
                }}
                className="bg-black w-28 top-[18.5rem] h-4 rounded-full left-[18rem] md:left-[22.5rem] number absolute rotate-90"
              ></div>
              <div className="bg-black w-28 absolute h-4 top-[22rem] number rounded-full"></div>
            </div>
          </div>
          {/* Submit On Task Success */}
          <button
            onClick={() => {
              if (invis1 == "transparent" && invis2 == "transparent") {
                setSuccess((prevState) => !prevState);
                handleClick();
              }
            }}
            className="bg-[#C38154] submitBtn text-black font-extrabold flex items-center justify-center mt-[26rem] md:mt-96 absolute right-56 md:right-24 w-52 gap-4 h-14 text-3xl"
          >
            Submit <img src={SubmitArrow} className="w-9" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
};
