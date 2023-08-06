import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  moveForwards,
  moveBackwards,
  moveForwardsRoute,
  moveBackwardsRoute,
  moveBackwardsMobile,
  moveBackwardsRouteMobile,
  moveForwardsMobile,
  moveForwardsRouteMobile,
} from "../redux/reducers/moveActions";
import { moveTrue, moveFalse } from "../redux/reducers/canMove";
import { addMove } from "../redux/reducers/movesNumber";
import SubmitArrow from "../assets/Submit-Arrow.svg";
import Draggable from "react-draggable";
import Cannon from "../assets/Cannon.svg";
import "../App.css";
import { useMediaQuery } from "react-responsive";

export const Task3 = () => {
  // Task Default Actions
  let timeLimit = 7000; // milliseconds

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const [success, setSuccess] = useState(false);
  const [position1, setPosition1] = useState([0, 0]);
  const [position2, setPosition2] = useState([0, 0]);
  const [display1, setDisplay1] = useState("block");
  const [display2, setDisplay2] = useState("block");
  const [loaded, setLoaded] = useState(0);

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

  // Get balls values
  const handleDrag = (element) => {
    return window
      .getComputedStyle(element)
      .getPropertyValue("transform")
      .substring(19)
      .split(/a-z|\(|\)|,|\s/)
      .filter((val) => val != false);
  };

  
  useEffect(() => {
    //Counting submitted balls
    setLoaded((l) => display1 == "none" || display2 == "none" ? l + 1 : l);

    dispatch(moveFalse());
    /* Task Timer Callback */
    if (!success) {
      var timerr = setTimeout(() => {
        dispatch(moveTrue());
        isNotDesktop
          ? dispatch(moveBackwardsMobile())
          : dispatch(moveBackwards());
        isNotDesktop
          ? dispatch(moveBackwardsRouteMobile())
          : dispatch(moveBackwardsRoute());
      }, timeLimit);

    } else {
      clearTimeout(timerr);
    }

    return () => {
      clearTimeout(timerr);
    };
  }, [
    //useEffect Dependencies
    moveTrue,
    moveBackwards,
    dispatch,
    timeLimit,
    display1,
    display2,
    //End of useEffect Dependencies
  ]);

  return (
    <>
      <div className="h-screen bg-black bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <div className="md:w-[934px] w-screen grid pop-up place-content-center bg-[#D9D9D9] h-[506px]">
          <div className="absolute h-4 bg-[#665A48] hidden md:block progress-div"></div>
          <div className="absolute h-4 bg-[#665A48] md:hidden mobile-progress-div"></div>
          <div className="gap-24 flex flex-col items-center mb-44">
            <h2 className="text-5xl font-extrabold">Load the cannon</h2>
            <div>
              <img
                src={Cannon}
                className="absolute -left-32 md:left-24 w-[20rem] mt-8"
                alt="cannon"
              />
              <div className="w-80 h-2 top-[26rem] absolute -left-32 md:left-24 bg-black opacity-25"></div>
              <Draggable
                defaultPosition={{ x: 0, y: 117 }}
                onDrag={() => {
                  setPosition1(handleDrag(document.getElementById("ammo1")));
                  if (
                    position1[0] > -150 &&
                    position1[0] < -90 &&
                    position1[1] > 14 &&
                    position1[1] < 60
                  ) {
                    setDisplay1("none");
                    console.log(loaded);
                  }
                }}
              >
                <div
                  id="ammo1"
                  style={{ display: display1 }}
                  className="w-[4rem] absolute h-[4rem] rounded-full cursor-grab bg-[#212121]"
                ></div>
              </Draggable>
              <Draggable
                defaultPosition={{ x: 80, y: 117 }}
                onDrag={() => {
                  setPosition2(handleDrag(document.getElementById("ammo2")));
                  if (
                    position2[0] > -150 &&
                    position2[0] < -90 &&
                    position2[1] > 14 &&
                    position2[1] < 60
                  ) {
                    setDisplay2("none");
                    console.log(loaded);
                  }
                }}
              >
                <div
                  id="ammo2"
                  style={{ display: display2 }}
                  className="w-[4rem] absolute h-[4rem] cursor-grab rounded-full bg-[#212121]"
                ></div>
              </Draggable>
            </div>
          </div>
          {/* Submit On Task Success */}
          <button
            onClick={() => {
              if (loaded === 2) handleClick();
            }}
            className="bg-[#C38154] submitBtn text-black font-extrabold flex items-center justify-center mt-[26rem] md:mt-96 absolute right-12 md:right-24 w-52 gap-4 h-14 text-3xl"
          >
            Submit <img src={SubmitArrow} className="w-9" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
};
