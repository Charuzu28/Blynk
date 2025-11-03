import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import Button from '../components/Button';

const TimerCircle = ({timeLeft, setTimeLeft, WORKTIME, mode}) => {


  const EYEREMINDER = 20 * 60;

  
  // EYE REMINDER 20/20/20
  const [isEyeClosed, setIsEyeClosed ] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const hasRemindedRef = useRef(false);

  const radius = 180;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / WORKTIME) * circumference;  

  // TIME COUNTDOWN
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
            // EYE WILL OPEN / CLOSE
            if(mode === "pomadoro" && WORKTIME - prev >= EYEREMINDER && !hasRemindedRef.current){
              
              triggerEyeReminder();
              hasRemindedRef.current = true;
            }
            return prev - 1;
          })
      },1000)
    }
      return () => clearInterval(intervalRef.current);
  }, [isRunning, WORKTIME, mode, setTimeLeft]);

    // MODE
  useEffect(()=>{
    setIsRunning(false);
    setTimeLeft(WORKTIME);
    hasRemindedRef.current = false;
  }, [WORKTIME,setTimeLeft]);

  const triggerEyeReminder = () => {
    notify("👀 20–20–20 Rule: Look 20 feet away for 20 seconds!")
    setIsEyeClosed(true);
    setTimeout( () => setIsEyeClosed(false), 20000); //RE OPEN AFTER 20 SECONDS
  }

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

      <div className='gap-5'>
        <div className='relative flex items-center justify-center'>
            <svg className='w-[400px] h-[400px] transform -rotate-90'>
            <circle
            cx="200"
            cy="200"
            r={radius}
            stroke='#e5e7eb'
            fill='transparent'
            strokeWidth="10"
            />
            <circle
            cx="200"
            cy="200"
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
            {formatTime(timeLeft)}
            </h1>

            {/* Buttons */}
            <div className='flex flex-col items-center justify-center mt-10'>
              {/* Start Button */}
              <Button
                text={isRunning ? "Pause" : "Start"}
                onClick={() => setIsRunning((prev) => !prev)
                }
              />

              <button
              href=""
              className='hover:underline text-blue-700 py-2 px-5 font-light cursor-pointer' 
              onClick={() => {
                setIsRunning(false),
                setTimeLeft(WORKTIME),
                hasRemindedRef.current = false;
              }}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      
    </div>
  )
}

export default TimerCircle