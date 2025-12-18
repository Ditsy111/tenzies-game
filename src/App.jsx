import "./App.css"
import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const[dice, setDice]=useState(generateAllDice())

    const gameWon=dice.every(die=>die.isHeld===true)&&dice.every(die=>die.value===dice[0].value)

    function generateAllDice(){
        const newDice=[];
        for(let i=0; i<10; i++){
            newDice.push({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        })
        }
        return newDice
    }
    function rollBack(){
         setDice(oldDice => oldDice.map(die => 
            die.isHeld ?
                die :
                { ...die, value: Math.ceil(Math.random() * 6) }
        ))
    }

    function hold(id){
        setDice(oldDice=>(
            oldDice.map(die=>(
                die.id===id?
                {...die, isHeld:!die.isHeld}
                :die
            ))
        ))
    }

    const diceElements = dice.map(dieObject => 
        <Die 
        key={dieObject.id}
        value={dieObject.value} 
        isHeld={dieObject.isHeld}
        id={dieObject.id}
        hold={()=>hold(dieObject.id)}
        />)
    return(
        <main>
            {gameWon && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            )}
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollBack}>{gameWon?"New Game": "Roll"}</button>
        </main>

    )
}