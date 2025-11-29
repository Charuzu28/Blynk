import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  const isSettingsPage = location.pathname === '/settings';

  return (
    <nav className="flex justify-between items-center px-4 py-4">
      <div>
        <Link 
          to="/" 
          className="font-poppins font-regular text-3xl text-blue-700">
          blynk'n
        </Link>
      </div>
      <div>
        <Link 
          to={isSettingsPage ? '/' : '/settings'} 
          className="underline text-blue-700 rounded-lg py-2 px-3 font-light transition-colors ease-in-out duration-300 hover:text-blue-500">
          {isSettingsPage ? 'close' : 'settings'} 
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
