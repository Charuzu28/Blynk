import React from 'react'
import { useTheme } from '../context/ThemeContext'

const colorMap = {
  blue: "bg-blue-500 hover:bg-blue-600",
  red: "bg-red-500 hover:bg-red-600",
  green: "bg-green-500 hover:bg-green-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  // fallback
  default: "bg-blue-500 hover:bg-blue-600",
}
const Button = ({text, onClick, color}) => {
  const { theme } = useTheme();
  const key = color || theme || "default";
  const classes = colorMap[key] || colorMap.default;

  return (
    <button 
    className={`${classes} text-white rounded-sm py-2 px-4 transition cursor-pointer items-center w-full shadow-md`} 
    onClick={onClick}>
        {text}
    </button>
  )
}

export default Button