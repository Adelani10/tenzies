import React from "react"
import './index.css'
import { nanoid } from "nanoid"
import Die from './Die'
import { useState } from 'react'
import { useEffect } from "react"
import Confetti from "react-confetti"

function App() {
  const [diceData, setDiceData] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)



  function generateDice() {
    return {
          value: Math.ceil(Math.random()*6),
          id: nanoid(),
          isHeld: false
        }
  }
  function allNewDice(){
    let eachDice = []
      for (let i=0; i<10; i++){
          eachDice.push(generateDice())
    }
    return eachDice
  }

  function holdDice (id) {
    setDiceData(prevData => prevData.map( item => {
        return id === item.id ? {...item, isHeld: !item.isHeld} : item
      })
    )
  }


  const diceElement = diceData.map(dice => {
    return <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)} />
  })

  function handleClick(){
    if(!tenzies){setDiceData(prevData => prevData.map(item => {
      return item.isHeld ? item : generateDice()
    }))}
    else if (tenzies){
      setTenzies(false)
      setDiceData(allNewDice())
    }
  }

  useEffect(()=>{
    // console.log("You won")
    const allIsHeld = diceData.every(item => item.isHeld)
    const firstValue = diceData[0].value

    const allSameValue = diceData.every(item => item.value === firstValue)
    if(allIsHeld && allSameValue){
      setTenzies(true)
    }
  }, [diceData])

  return (
    <div className="w-full h-3/4 md:w-1/2 p-4 bg-neutral-400 rounded-md shadow-md shadow-black">
      {tenzies && <Confetti/> }
      <div className="h-full px-4 bg-[#F5F5F5] flex flex-col justify-center rounded-xl space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">Tenzies</h1>
        <p className="text-zinc-400 text-lg md:text-xl">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        <main className="w-full grid grid-cols-5 gap-3 pb-12">
            {diceElement}
        </main>
        <button onClick={handleClick} className="py-3 w-1/2 mx-auto rounded-lg font-bold text-2xl bg-sky-300 hover:text-white hover:bg-zinc-700 tracking-widest">{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </div>
  )
}

export default App
