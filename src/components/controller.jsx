import React, { useContext } from "react";
import { MyGameContext } from "./game";

// console.log(MyGameContext);

export default class Controller extends React.Component {
  state = { nowPlay: "p2" };

  onHoldClick = () => {
    if (this.state.nowPlay === "p1") {
      this.setState({ nowPlay: "p2" });
    } else {
      this.setState({ nowPlay: "p1" });
    }
    this.props.callOnHoldClick(this.state.nowPlay);
  };

  render() {
    return (
      <div className="controller">
        <NewGameBtn OnNewGameClicked={this.props.CallonNewGameClicked} />
        <div className="dice-container">
          <div className={`img1 ${this.props.diceA}`}></div>
          <div className={`img2 ${this.props.diceB}`}></div>
        </div>
        <RoleDiceBtn />
        <OnHoldBtn clickedHold={this.onHoldClick} />
        <input
          onChange={(e) => {
            this.props.onInputMaxPts(e.target.value);
          }}
        ></input>
      </div>
    );
  }
}

function NewGameBtn() {
  const rollDiceContext = useContext(MyGameContext);
  return (
    <button onClick={() => rollDiceContext.setIsNewGame((prev) => !prev)}>
      <i className="fa-solid fa-circle-plus"></i> New Game
    </button>
  );
}

function RoleDiceBtn() {
  const rollDiceContext = useContext(MyGameContext);
  return (
    <button
      onClick={() => {
        const randA = Math.ceil(Math.random() * 6);
        const randB = Math.ceil(Math.random() * 6);
        rollDiceContext.setDiceImg([`dice${randA}`, `dice${randB}`]);

        rollDiceContext.activePlayer === "p1"
          ? rollDiceContext.setCurrentScore((prev) => {
              return [prev[0] + (randA !== randB ? randA + randB : 0), prev[1]];
            })
          : rollDiceContext.setCurrentScore((prev) => {
              return [prev[0], randA !== randB ? prev[1] + randA + randB : 0];
            });

        randA === randB && rollDiceContext.activePlayer === "p1" && rollDiceContext.SetActive("p2");
        randA === randB && rollDiceContext.activePlayer === "p2" && rollDiceContext.SetActive("p1");
      }}
    >
      <i className="fa-solid fa-arrows-spin"></i> Role Dice
    </button>
  );
}

function OnHoldBtn(props) {
  return (
    <button onClick={props.clickedHold}>
      <i className="fa-solid fa-hand-holding-hand"></i> Hold
    </button>
  );
}
