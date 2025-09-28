import React from 'react'

const Button = ({text, onClick}) => {
  return (
    <button 
    className='bg-blue-400 text-white rounded-sm py-2 px-3 hover:bg-blue-500 transition' 
    onClick={onClick}>
        {text}
    </button>
  )
}

export default Button