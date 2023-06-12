import React, { useState } from "react";
import Dice from "./components/Dice";
import "./index.css";
import { nanoid } from "nanoid";

export default function App() {
  function randDiceGenerator() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  const [tenzies, setTenzies] = useState(false);
  const [diceArray, setDiceArray] = useState(allFirstDice());

  React.useEffect(() => {
    const allHeld = diceArray.every((die) => die.isHeld);
    // checking if all the values are similar with the first value
    const firstValue = diceArray[0].value;
    const allSameValue = diceArray.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      alert("You Won!");
    }
  }, [diceArray]);

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
      newDice.push(randDiceGenerator());
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
