import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import Button from '../components/Button';

const TimerCircle = () => {
  // Buttons
  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(WORKTIME);
  }
  const btnItems = [
    {text: "Start", onClick: handleStart}, 
    {text: "Pause", onClick: handlePause},
    {text: "Reset", onClick: handleReset}
  ];

  const WORKTIME = 25 * 60;
  const EYEREMINDER = 20 * 60;

  
  // EYE REMINDER 20/20/20
  const [isEyeClosed, setIsEyeClosed ] = useState(false);

  const [timeleft, setTimeLeft ] = useState(WORKTIME);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeleft / WORKTIME) * circumference;  

  useEffect(() => {
    if(isRunning){
      intervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if(prev <= 5){
              clearInterval(intervalRef.current);
              notify("⏱ Time’s up! Take a 5-min break.")
              setIsRunning(false)
              return WORKTIME;
            }
            
            if(prev === EYEREMINDER){
              notify("Blink or step away from screen for 20 seconds!")
              setIsEyeClosed(true);
            }
            return prev - 1;
          })
      },1000)
    }
      return () => clearInterval(intervalRef.current);
  }, [isRunning]);


  const notify = (msg) => {
    if(Notification === 'granted') new Notification(msg);
    else alert(msg);
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }
  return (
    <div className='flex flex-col items-center justify-center'>

      <div className=''>
        <div className='relative flex items-center justify-center'>
            <svg className='w-64 h-64 transform -rotate-90'>
            <circle
            cx="128"
            cy="128"
            r={radius}
            stroke='#e5e7eb'
            fill='transparent'
            strokeWidth="10"
            />
            <circle
            cx="128"
            cy="128"
            r={radius}
            stroke='#3B82F6'
            fill='transparent'
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap='round'
            />
          </svg>
          {/* Header */}
          <div className='absolute flex flex-col items-center'>
            {isEyeClosed ? ( 
              <LuEyeClosed className=' text-blue-500 font-light' size={70} />
            ) : (
              <FiEye className=' text-blue-500 font-light' size={70} />
            )}
            <h1 className='text-5xl font-bold text-blue-500'>
            {formatTime(timeleft)}
            </h1>
          </div>
        </div>
      </div>
      
      
      {/* Buttons */}
      <div className='flex space-x-3 mt-5'>
        {/* Start Button */}
        {btnItems.map((btnItem)=> {
          return <Button key={btnItem} text={btnItem.text} onClick={btnItem.onClick} />
        })}
      </div>
    </div>
  )
}

export default TimerCircle