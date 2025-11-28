import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import Button from '../components/Button';
import alarmSound from '../assets/alarm/alarmRing.mp3';
import AlertModal from './AlertModal';
import { useTheme } from '../context/ThemeContext';

const TimerCircle = ({timeLeft, setTimeLeft, WORKTIME, mode}) => {
  const { theme } = useTheme();

  // MODAL
  const [modalConfig, setModalConfig] = useState({
    open: false,
    title: "",
    message: "",
  });

  // EYE REMINDER 20/20/20
  const EYEREMINDER = 20 * 60;
  const [isEyeClosed, setIsEyeClosed ] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  // REF
  const intervalRef = useRef(null);
  // const hasRemindedRef = useRef(false);
  const eyeRemindedRef = useRef(false);
  const sessionRemindedRef = useRef(false);
  const ringSound = useRef(new Audio(alarmSound));

  const radius = 180;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / WORKTIME) * circumference;  

  // TIME COUNTDOWN
  useEffect(() => {
    if(isRunning){
      intervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if(prev <= 1){
              clearInterval(intervalRef.current);
              intervalRef.current = null;
              setIsRunning(false)
              
              if(!sessionRemindedRef.current){
                sessionRemindedRef.current = true;
                ringSound.current.currentTime = 0;
                ringSound.current.play().catch(() => {});

                if(mode === 'pomadoro'){
                  showModal("Pomodoro Over","⏱ Time’s up! Take a 5-min break.");
                }
                if(mode === 'shortBreak'){
                  showModal("Break Over","⏱ Time’s up! Your short break is done.");
                }
                if(mode === 'longBreak'){
                  showModal("Long Break Over","⏱ Time’s up! Your long break is done.");
                }

              }
              return WORKTIME;
            }
            // EYE WILL OPEN / CLOSE
            if(mode === "pomadoro" && WORKTIME - prev >= EYEREMINDER && !eyeRemindedRef.current){
              
              triggerEyeReminder();
              // eyeRemindedRef.current = true;
            }
            return prev - 1;
          })
      },1000)
    }
      return () => clearInterval(intervalRef.current);
      intervalRef.current = null;
  }, [isRunning, WORKTIME, mode, setTimeLeft]);

    // MODE
  useEffect(()=>{
    setIsRunning(false);
    setTimeLeft(WORKTIME);
    sessionRemindedRef.current = false;
    eyeRemindedRef.current = false;
  }, [WORKTIME,setTimeLeft]);

  const showModal = (title, message) => {
    setModalConfig({
      open: true,
      title,
      message,
    });
  };

  const closeModal = () => {
    ringSound.current.pause();
    ringSound.current.currentTime = 0;
    setModalConfig((prev) => ({ ...prev, open: false }));
  };
  
  // Add ring / not?
  const triggerEyeReminder = () => {
    eyeRemindedRef.current = true;
    showModal("👀 20–20–20 Rule: Look 20 feet away for 20 seconds!")
    setIsEyeClosed(true);
    setTimeout( () => setIsEyeClosed(false), 20000); //RE OPEN AFTER 20 SECONDS
  }

  // disregard this
  const notify = (msg) => {
    if(Notification === 'granted') new Notification(msg);
    else alert(msg);
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  const colorHex = {
    blue: "#3B82F6",
    red: "#EF4444",
    green: "#22C55E",
    purple: "#A855F7",
  }[theme] || "#3B82F6";
  
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
            stroke={colorHex}
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
              <LuEyeClosed color={colorHex} size={70} />
            ) : (
              <FiEye color={colorHex} size={70} />
            )}
            <h1 style={{ color: colorHex}} className='text-5xl font-bold'>
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
              className='hover:underline text-blue-700 py-2 px-5 font-light cursor-pointer' 
              onClick={() => {
                clearInterval(intervalRef.current);
                intervalRef.current = null;

                ringSound.current.pause();
                ringSound.current.currentTime = 0;
                setIsRunning(false),
                setTimeLeft(WORKTIME),

                sessionRemindedRef.current = false;
                eyeRemindedRef.current = false;
              }}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <AlertModal
        open={modalConfig.open}
        onClose={closeModal}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={() => {
          // clearInterval(intervalRef.current);
          // intervalRef.current = null;
          // setIsRunning(false);
          // hasRemindedRef.current = false;
          ringSound.current.pause();
          ringSound.current.currentTime = 0;
          setModalConfig(prev => ({...prev, open: false}));
        }}
      />
      
    </div>
  )
}

export default TimerCircle