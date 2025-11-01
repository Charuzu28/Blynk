import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <button 
    className='bg-blue-400 text-white rounded-sm py-2 px-4 hover:bg-blue-500 transition cursor-pointer items-center w-full shadow-md' 
    onClick={onClick}>
        {text}
    </button>
  )
}

export default Button