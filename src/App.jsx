import React, { useState } from "react";
import Dice from "./components/Dice";
import "./index.css";
import { nanoid } from "nanoid";

export default function App() {
  const [isHeld, setIsHeld] = useState(false);
  function randDiceGenerator() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: isHeld,
      id: nanoid(),
    };
  }
  const [diceArray, setDiceArray] = useState(allFirstDice());
  function rollDice() {
    setDiceArray((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : randDiceGenerator();
      })
    );
  }

  function allFirstDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: isHeld,
        id: nanoid(),
      });
    }
    return newDice;
  }
  function holdDice(id) {
    setDiceArray(
      diceArray.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        }
        return die;
      })
    );
  }
  const dice = diceArray.map((die) => {
    return (
      <Dice
        key={die.id}
        value={die.value}
        holdDice={() => holdDice(die.id)}
        isHeld={die.isHeld}
      />
    );
  });

  return (
    <div className='App'>
      <div className='container'>
        <div className='dice-container'>{dice}</div>
        <button onClick={rollDice} className='roll-btn'>
          Roll
        </button>
      </div>
    </div>
  );
}
