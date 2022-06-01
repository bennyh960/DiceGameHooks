// import "./styleDraft.css";
import "../style/styleDraft.css";
import Players from "./players";
import Controller from "./controller";
import React, { useEffect, useRef, useState } from "react";

export const MyGameContext = React.createContext();

// Creating function componenet

export default function Game() {
  //* States
  const [diceImg, setDiceImg] = useState([
    `dice${Math.ceil(Math.random() * 6)}`,
    `dice${Math.ceil(Math.random() * 6)}`,
  ]);
  const [activePlayer, SetActive] = useState("p1");
  const [currentScore, setCurrentScore] = useState([0, 0]);
  const [totalScore, setToatlScore] = useState([0, 0]);

  const [maxPoints, setMaxPoints] = useState(30);
  const [isWin, setIsWin] = useState([false, false]);
  const [isNewGame, setIsNewGame] = useState(false);

  // * Functions

  const callOnHoldClick = () => {
    if (activePlayer === "p1") {
      SetActive("p2");
      setToatlScore((prev) => {
        return [prev[0] + currentScore[0], prev[1]];
      });
      totalScore[0] + currentScore[0] > maxPoints && setIsWin((prev) => [!prev[0], prev[1]]);
      setCurrentScore((prev) => {
        return [0, prev[1]];
      });
    } else {
      SetActive("p1");
      setToatlScore((prev) => {
        return [prev[0], currentScore[1] + prev[1]];
      });
      totalScore[1] + currentScore[1] > maxPoints && setIsWin((prev) => [prev[0], !prev[1]]);
      setCurrentScore((prev) => {
        return [prev[0], 0];
      });
    }

    if (isWin[0] === true || isWin[1] === true) {
      console.log("winner decleared and timeout run");
      setTimeout(() => {
        setIsWin([false, false]);
      }, 1500);
    }
  };

  useEffect(() => {
    // console.log(isWin);
    return () => {
      setCurrentScore([0, 0]);
      setToatlScore([0, 0]);
    };
  }, [isWin, isNewGame]);

  const handleMaxPoint = (Newvalue) => {
    setMaxPoints(Newvalue);
  };
  return (
    <div className="container">
      <MyGameContext.Provider
        value={{ diceImg, setDiceImg, activePlayer, SetActive, setCurrentScore, setIsNewGame, setMaxPoints }}
      >
        <Controller
          callOnHoldClick={callOnHoldClick}
          onInputMaxPts={handleMaxPoint}
          diceA={diceImg[0]}
          diceB={diceImg[1]}
        />
      </MyGameContext.Provider>
      <Players
        playerNum="p1"
        pIdx={1}
        turnClass={activePlayer === "p1" ? "turn-symbol" : ""}
        scoreTotal={totalScore[0]}
        currentScore={currentScore[0]}
        isWinner={isWin[0]}
      />
      <Players
        playerNum="p2"
        pIdx={2}
        turnClass={activePlayer === "p2" ? "turn-symbol" : ""}
        scoreTotal={totalScore[1]}
        currentScore={currentScore[1]}
        isWinner={isWin[1]}
      />
    </div>
  );
}
