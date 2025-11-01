import React from 'react'

const MODES =[
        {key: "pomadoro", label: "Pomadoro"},
        {key: "shortBreak", label: "Short-Break"},
        {key: "longBreak", label: "Long-Break"}
    ];

const ModeSelector = ({mode, setMode, setTimeLeft, DURATION}) => {
  return (
    <div className='flex space-x-3 justify-center'>
        {MODES.map((m) => (
            <button
            key={m.key}
            onClick={() => {
                setMode(m.key);
                setTimeLeft(DURATION(m.key));
            }}
            className={`py-4 px-2 rounded-lg shadow-md font-medium transition ${
                mode == m.key
                ? "bg-blue-400 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}>
                {m.label}
            </button>
        ))}
    </div>
  )
}

export default ModeSelector