import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SubmitArrow from "../assets/Submit-Arrow.svg";
import "../App.css";
import axios from "axios";

export const Congrats = () => {

  //Text Input
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  const nameTest = (str) => {
    if (str) return str.match(/\w/gi).join("") == str;
    return "";
  };

  useEffect(() => {
    setInputError( nameTest(input) ? "Valid" : "Invalid name");
  }, [input])
  

  const handleSubmit = async() => {

    if(inputError == "Valid") {
      setCanSubmit(false);
      await axios
        .post(
          "https://cubigoal-backend.onrender.com:8080/players",
          { name: input },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .catch((error) => {
          console.error(error);
          setInputError("Server Error");
        });
      location.reload();
    }
    
  }

  return (
    <>
      <div className="h-screen bg-black bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <div className="w-[934px] scale-[.9] md:scale-100 grid pop-up place-content-center bg-[#D9D9D9] border-4 border-[#FFD89C] h-[506px]">
          <div className="gap-12 flex flex-col items-center mb-32">
            <div className="grid place-items-center gap-4">
              <h2 className="text-4xl md:text-5xl font-extrabold">CONGRATULATIONS!</h2>
              <p>Enter your username to appear in the winners table!</p>
            </div>
            <div>
              <input
                type="text"
                style={{
                  borderColor: inputError == "Valid" ? "#91B89D" : "#C35B54",
                }}
                className="w-96 px-4 h-12 text-xl border-2 box-content outline-none"
                onChange={(e) =>
                  setInput(
                    e.target.value == "'" || e.target.value == '"'
                      ? "'"
                      : e.target.value
                  )
                }
                placeholder="Write Here"
              />
              <p
                style={{
                  color: inputError == "Valid" ? "#91B89D" : "#C35B54",
                }}
              >
                {inputError}
              </p>
            </div>
          </div>
          {/* Submit On Task Success */}
          <button
            onClick={() => { if (canSubmit) handleSubmit() }}
            className="bg-[#C38154] submitBtn text-black font-extrabold flex items-center justify-center mt-96 absolute right-64 md:right-24 w-52 gap-4 h-14 text-3xl">
            Submit <img src={SubmitArrow} className="w-9" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
};
