import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  moveForwards,
  moveBackwards,
  moveForwardsRoute,
  moveBackwardsRoute,
  moveForwardsMobile,
  moveForwardsRouteMobile,
  moveBackwardsMobile,
  moveBackwardsRouteMobile,
} from "../redux/reducers/moveActions";
import { moveTrue, moveFalse } from "../redux/reducers/canMove";
import { addMove } from "../redux/reducers/movesNumber";
import SubmitArrow from "../assets/Submit-Arrow.svg";
import "../App.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useMediaQuery } from "react-responsive";

export const Task5 = () => {
  // Task Default Actions
  let timeLimit = 7000; // milliseconds

  const isNotDesktop = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  const [success, setSuccess] = useState(false);

  const [poggers, setPoggers] = useState(window.innerWidth)

  const possibilities = [
    [2, 3, 1, 4],
    [1, 3, 2, 4],
    [3, 2, 1, 4],
    [2, 1, 3, 4],
  ];

  const compareArrays = (arr1, arr2) => {
    if (arr1.length != arr2.length) return false;
    let counter = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] == arr2[i]) counter++;
    }
    return arr1.length === counter;
  };

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
  //Task Timer Callback
  useEffect(() => {
    dispatch(moveFalse());
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
    window.addEventListener("resize", () => setPoggers(window.innerWidth))
    return () => {
      clearTimeout(timerr);
      window.removeEventListener("resize", () =>
        setPoggers(window.innerWidth)
      );
    };
  }, [moveTrue, moveBackwards, dispatch, timeLimit, poggers]);

  function handleDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(numbersArray);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNumbersArray(items);
  }

  const [numbersArray, setNumbersArray] = useState(
    possibilities[Math.floor(Math.random() * 4)]
  );

  return (
    <>
      <div className="h-screen bg-black bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="w-[934px] scale-[.9] md:scale-100 grid pop-up bg-[#D9D9D9] h-[506px]">
            <div className="absolute h-4 bg-[#665A48] hidden md:block progress-div"></div>
            <div className="relative m-auto mt-0 h-4 bg-[#665A48] md:hidden mobile-progress-div"></div>
            <div className="gap-24 flex flex-col md:mt-6 items-center mb-44">
              <h2 className="text-5xl relative top-10 font-extrabold">
                Sort the numbers
              </h2>

              <Droppable droppableId="numbers-task" direction="horizontal">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="relative top-12 p-4 bg-[#939393] flex gap-4"
                  >
                    {numbersArray.map((num, i) => (
                      <Number
                        windowWidth={poggers}
                        num={num}
                        index={i}
                        key={`draggable-${num}`}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            {/* Submit On Task Success */}
            <button
              onClick={() => {
                if (compareArrays([1, 2, 3, 4], numbersArray)) {
                  setSuccess((prevState) => !prevState);
                  handleClick();
                }
              }}
              className="bg-[#C38154] submitBtn text-black font-extrabold flex items-center justify-center mt-96 absolute ml-96 md:ml-[40rem] w-52 gap-4 h-14 text-3xl"
            >
              Submit <img src={SubmitArrow} className="w-9" alt="arrow" />
            </button>
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

const Number = ({ num, index, windowWidth }) => {

  const offsetGetter = (n) => {
    switch (true) {
      case n >= 1900:
        return 500;
      case n < 1900 && n >= 1700:
        return 430;
      case n < 1700 && n >= 1500:
        return 360;
      case n < 1500 && n >= 1300:
        return 235;
      case n < 1500 && n >= 1300:
        return 235;
      case n < 1300 && n >= 1100:
        return 140;
      case n < 1100 && n >= 900:
        return 30;
      case n < 900 && n >= 700:
        return -70;
      case n < 700 && n >= 500:
        return -160;
      default:
        return -240;
    }
  }

  return (
    <Draggable draggableId={`draggable-${num}`} index={index}>
      {(provided, snapshot) => 
      {
        if (snapshot.isDragging) {
          const offset = offsetGetter(windowWidth);
          const x = provided.draggableProps.style.left - offset;
          provided.draggableProps.style.left = x;
        }
        return (
          <div
            id={`draggable-${num}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-24 h-24 relative flex justify-center select-none items-center text-[38px] text-white font-extrabold"
          >
            {num}
          </div>
        )
      }
    }
    </Draggable>
  );
}
