import axios from "axios";
import { useEffect, useState } from "react";
import SubmitArrow from "./assets/Submit-Arrow.svg";
import "./App.css";

export const Winners = ({ toggle }) => {
  const dateParser = (date) => {
    if (date == ":/" || !date) return ":/";
    const parsedDate = date.substring(2, 10);
    return parsedDate.split("-").reverse().join("-");
  };

  const [listOfPlayers, setListOfPlayers] = useState([]);

  //Text Input
  useEffect(() => {
    axios
      .get("https://cubigoal-backend.onrender.com:8080/players", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => setListOfPlayers(response.data))
      .catch((error) => {
        setListOfPlayers([
          {
            name: "Error Getting Data",
            submitDate: ":/",
          },
        ]);
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="h-screen bg-black bg-opacity-25 absolute top-0 w-full grid place-content-center z-[99]">
        <div className="md:w-[934px] w-screen grid pop-up place-content-center bg-[#D9D9D9] border-4 border-[#FFD89C] h-[586px] md:h-[556px]">
          <div className="gap-10 flex flex-col items-center mb-24">
            <div className="grid place-items-center gap-4">
              <h2 className="text-5xl text-center w-[90%] font-extrabold">
                List of the latest Winners!
              </h2>
              <p className="text-center w-[90%]">
                *if you don't see your name here you must finish the game first
              </p>
            </div>
            <div className="w-full space-y-2">
              {listOfPlayers.map((playerData) => (
                <div className="flex justify-between w-[90%] m-auto md:w-full border-2 border-gray-400 px-6 py-2">
                  <p className="font-bold text-lg">{playerData.name}</p>
                  <p className="text-gray-400">
                    {dateParser(playerData.submitDate)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Submit On Task Success */}
          <button
            onClick={toggle}
            className="bg-[#C38154] submitBtn text-black font-extrabold flex items-center justify-center mt-[30rem] md:mt-[27rem] absolute right-24 w-52 gap-4 h-14 text-3xl"
          >
            Close <img src={SubmitArrow} className="w-9" alt="arrow" />
          </button>
        </div>
      </div>
    </>
  );
};
