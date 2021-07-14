import React, { useState, useEffect } from 'react'
import './App.css'

let elapsedTime = 0
let previousLapTime = 0

function convertTime(totalTime) {
  let minutes = Math.floor(totalTime/60000)
  let seconds = Math.floor((totalTime % 60000)/1000)
  let hundredth = Math.floor((totalTime % 1000)/10)

  return `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}.${hundredth.toString().padStart(2,"0")}`
}

export default function Stopwatch() {

  const [startTime, setStartTime] = useState(0)
  const [lapsArray, setLapsArray] = useState([])
  const [currentTime, setCurrentTime] = useState(0)

  const [minLap, setMinLap] = useState({
    lapNumber: 0,
    lapTime: Number.POSITIVE_INFINITY
  })

  const [maxLap, setMaxLap] = useState({
    lapNumber: 0,
    lapTime: Number.NEGATIVE_INFINITY
  })

  useEffect( () => {
    let intervalToken
    if (startTime) {
      intervalToken = setInterval(() => setCurrentTime(Date.now() - startTime + elapsedTime), 10)
    }
    return function cleanUp() {
      clearInterval(intervalToken)
    }
  }) 

  function startTimer() {
    setStartTime(Date.now())
  }

  function stopTimer() {
    elapsedTime += Date.now() - startTime
    setStartTime(0)
  }

  function resetTimer() {
    elapsedTime = 0
    previousLapTime = 0
    setCurrentTime(0)
    setStartTime(0)
    setLapsArray([])
    setMaxLap({
      lapNumber: 0,
      lapTime: Number.NEGATIVE_INFINITY
    })
    setMinLap({
      lapNumber: 0,
      lapTime: Number.POSITIVE_INFINITY
    })
  }

  function recordLaps() {
    const newLapInfo = {
      lapNumber: lapsArray.length + 1,
      lapTime: currentTime - previousLapTime
    }
    setLapsArray(prevArray => [newLapInfo, ...prevArray])
    updateMinMaxLaps(newLapInfo)
    previousLapTime = currentTime
  }

  function updateMinMaxLaps(newLap) {
    setMinLap(newLap.lapTime < minLap.lapTime ? newLap : minLap)
    setMaxLap(newLap.lapTime > maxLap.lapTime ? newLap : maxLap)
  }

  function reassignMinMaxLaps(currentLap) {
    if (currentLap.lapNumber === minLap.lapNumber) {
      return "min-value"
    }
    else if (currentLap.lapNumber === maxLap.lapNumber) {
      return "max-value"
    }
  }

  const onStartStopButtonClick = startTime ? stopTimer : startTimer
  const onResetLapButtonClick = startTime ? recordLaps : resetTimer
  const startStopButtonText = startTime ? 'Stop' : 'Start'
  const resetLapButtonText = startTime || !currentTime ? 'lap' : 'reset'
  const startStopButtonColour = startTime ? 'stop' : 'start'
  const resetLapButtonColour = currentTime ? 'reset-lap' : 'disabled'

  return (
    <div className="container">
      <div className="time">{convertTime(currentTime)}</div>
      <button className={resetLapButtonColour} onClick={onResetLapButtonClick}>{resetLapButtonText}</button>
      <button className={startStopButtonColour} onClick={onStartStopButtonClick}>{startStopButtonText}</button>
      <ul>
        {lapsArray.map(lap => {
          const assignedClasses = lapsArray.length > 2 ? reassignMinMaxLaps(lap) : null
          return <li key={lap.lapNumber} className = {assignedClasses}>Lap {lap.lapNumber}<span>{convertTime(lap.lapTime)}</span></li>
        })}
      </ul>
    </div>
  )

}