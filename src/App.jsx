import React, { useState } from "react";
import Dice from "./components/Dice";
import "./index.css";
import { nanoid } from "nanoid";

export default function App() {
  const [isHeld, setIsHeld] = useState(false);
  function randDiceGenerator() {
    let newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: isHeld,
        id: nanoid(),
      });
    }
    return newArray;
  }
  const [diceArray, setDiceArray] = useState(randDiceGenerator());
  function setNewValue() {
    setDiceArray(randDiceGenerator());
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
  const dice = diceArray.map((die, i) => {
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
        <button onClick={setNewValue} className='roll-btn'>
          Roll
        </button>
      </div>
    </div>
  );
}
