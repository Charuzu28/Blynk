import React from 'react'
import { useTheme } from '../context/ThemeContext';

const MODES =[
        {key: "pomadoro", label: "Pomadoro"},
        {key: "shortBreak", label: "Short-Break"},
        {key: "longBreak", label: "Long-Break"}
    ];

const ModeSelector = ({mode, setMode, setTimeLeft, DURATION}) => {

    const { theme } = useTheme();

    const colorHex = {
    blue: "#3B82F6",
    red: "#EF4444",
    green: "#22C55E",
    purple: "#A855F7",
  }[theme] || "#3B82F6";

  return (
    <div className='flex flex-wrap justify-center gap-3 mt-6 px-4'>
        {MODES.map((m) => {
         const isActive = mode === m.key;

            return (
               <button
                    key={m.key}
                    onClick={() => {
                        setMode(m.key);
                        setTimeLeft(DURATION(m.key));
                    }}
                    className={`py-4 px-2 rounded-lg shadow-md font-medium transition ${
                       isActive ? " text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    
                    style={{backgroundColor: isActive ? colorHex : undefined}}
                    >
                {m.label}
            </button> 
            )
            
        })}
    </div>
  )
}

export default ModeSelector