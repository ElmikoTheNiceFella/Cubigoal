import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  moveForwards,
  moveBackwards,
  moveForwardsRoute,
  moveBackwardsRoute,
  moveForwardsMobile,
  moveBackwardsMobile,
  moveForwardsRouteMobile,
  moveBackwardsRouteMobile,
} from "../redux/reducers/moveActions";
import { moveTrue, moveFalse } from "../redux/reducers/canMove";
import { addMove } from "../redux/reducers/movesNumber";
import SubmitArrow from "../assets/Submit-Arrow.svg";
import { useMediaQuery } from "react-responsive";
import "../App.css";

export const Task1 = () => {
  // Task Default Actions
  let timeLimit = 7000; // milliseconds
  
  const [success, setSuccess] = useState(false);

  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  //Redux Dispatch
  const dispatch = useDispatch();

  const handleClick = () => {
    //Changes Success State On Completion
    setSuccess((prevState) => !prevState);
    //Redux Actions
    dispatch(moveTrue());
    isNotDesktop ? dispatch(moveForwardsMobile()) : dispatch(moveForwards());
    isNotDesktop ? dispatch(moveForwardsRouteMobile()) : dispatch(moveForwardsRoute());
    dispatch(addMove());
  };
  //Task Timer Callback
  useEffect(() => {
    setNumber1(Math.floor(Math.random() * 20));
    setNumber2(Math.floor(Math.random() * 20));
    dispatch(moveFalse());
    // if (!success) {
    //   var timerr = setTimeout(() => {
    //     dispatch(moveTrue());
    //     isNotDesktop
    //       ? dispatch(moveBackwardsMobile())
    //       : dispatch(moveBackwards());
    //     isNotDesktop
    //       ? dispatch(moveBackwardsRouteMobile())
    //       : dispatch(moveBackwardsRoute());
    //   }, timeLimit);
    // } else {
    //   clearTimeout(timerr);
    // }
    // return () => {
    //   clearTimeout(timerr);
    // };
  }, [moveTrue, moveBackwards, dispatch, timeLimit]);

  //Text Input
  const [input, setInput] = useState("");

  return (
    <>
      <div className="h-screen bg-black scale-80 md:scale-100 bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <div className="md:w-[934px] w-screen grid pop-up place-content-center bg-[#D9D9D9] h-[506px]">
          <div className="absolute h-4 bg-[#665A48] hidden md:block progress-div"></div>
          <div className="absolute h-4 bg-[#665A48] md:hidden mobile-progress-div"></div>
          <div className="gap-24 flex flex-col items-center mb-44">
            <h2 className="text-5xl font-extrabold">
              What's {number1} + {number2}?
            </h2>
            <input
              type="text"
              className="w-56 md:w-96 px-4 h-12 text-xl border-2 box-content border-black"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Answer here"
              onKeyDown={(event) => {
                if (input == number1 + number2 && event.key == "Enter") {
                  setSuccess((prevState) => !prevState);
                  handleClick();
                }
              }}
            />
          </div>
          {/* Submit On Task Success */}
          <button
            onClick={() => {
              if (input == number1 + number2) {
                setSuccess((prevState) => !prevState);
                handleClick();
              }
            }}
            className="bg-[#C38154] submitBtn text-black font-extrabold flex items-center justify-center mt-96 absolute right-24 w-52 gap-4 h-14 text-3xl"
          >
            Submit <img src={SubmitArrow} className="w-9" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
};
