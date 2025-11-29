import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full py-4 shadow-md">
      <div className="flex items-center justify-center px-4 sm:px-8 md:px-16">
        <span className="text-blue-700 font-poppins text-xs sm:text-sm md:text-base font-light text-center">
          Made by{' '}
          <a
            href="https://chs-portfolio81.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-600"
          >
            Charles Alamares
          </a>{' '}
          & inspired by{' '}
          <a
            href="https://blynker.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-600"
          >
            blynker.com
          </a>{' '}
          | ver. 1.0.0
        </span>
      </div>
    </footer>
  );
};

export default Footer;
