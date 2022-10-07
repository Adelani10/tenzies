import React from "react"
import './index.css'

export default function Die(props) {


    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
            <h1 style={styles} onClick={props.holdDice} className="cursor-pointer py-4  box-border flex justify-center items-center font-bold text-2xl md:text-4xl shadow-md shadow-black rounded-md">
                {props.value}
            </h1>
        )
}