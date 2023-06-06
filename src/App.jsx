import React, { useState } from "react";
import Dice from "./components/Dice";
import "./index.css";

export default function App() {
  function randDiceGenerator() {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(Math.ceil(Math.random() * 6));
    }
    return newArray;
  }
  const [diceArray, setDiceArray] = useState(randDiceGenerator());
  function setNewValue() {
    setDiceArray(randDiceGenerator());
  }

  const dice = diceArray.map((die, i) => {
    return <Dice key={i} value={die} />;
  });

  return (
    <div className='App'>
      <div className='dice-container'>{dice}</div>
      <button onClick={setNewValue} className='roll-btn'>
        Roll
      </button>
    </div>
  );
}
