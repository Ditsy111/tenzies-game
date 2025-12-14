import "./App.css"
import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"

export default function App() {
    const[dice, setDice]=useState(generateAllDice())
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
        setDice(generateAllDice())
    }

    function hold(id){
        console.log(id)
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
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollBack}>Roll</button>
        </main>

    )
}