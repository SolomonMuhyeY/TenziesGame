import React, { useState } from "react";
import Dice from "./components/Dice";
import "./index.css";
export default function App() {
  const [diceArray, setDiceArray] = useState(randDiceGenerator);
  function randDiceGenerator() {
    for (let i = 0; i < 10; i++) {
      diceArray.push(Math.ceil(Math.random() * 6));
    }
  }

  const dice = diceArray.map((die, i) => {
    return <Dice key={i} value={die} />;
  });
  return (
    <div className='App'>
      <div className='dice-container'>{dice}</div>
      <button
        onClick={() =>
          setDiceArray(diceArray.push(Math.ceil(Math.random() * 6)))
        }
        className='roll-btn'
      >
        Roll
      </button>
    </div>
  );
}
