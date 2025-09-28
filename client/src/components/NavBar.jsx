import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-between m-5'>
      <div>
        <a href="" className='font-poppins font-medium text-3xl text-blue-700'>Blynk'n</a>
      </div>
        <div>
          <a href="" className='hover:underline text-blue-700 rounded-lg py-2 px-3 font-light'> Settings</a>
        </div>
    </nav>
  )
}

export default NavBar