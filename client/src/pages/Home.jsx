import React from 'react'
import TimeCircle from '../components/TimerCircle';
import ModeSelector from '../components/ModeSelector';
import { useState } from 'react';

const DURATION = {
  pomadoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,

}

const Home = () => {

  const [mode, setMode] = useState('pomadoro');
  const [timeLeft, setTimeLeft] = useState(DURATION.pomadoro);

  const getDuration = (key) => DURATION[key] || DURATION.pomadoro;
  return (
    <main className='w-full mx-auto'>
      <section>
        <TimeCircle
        mode={mode}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        WORKTIME={getDuration(mode)} />
        <ModeSelector
        mode={mode}
        setMode={setMode}
        setTimeLeft={setTimeLeft}
        DURATION={getDuration}
         />
      </section>
      <section>
        {/* TaskList */}
      </section>
      <section>
        {/* Task Item */}
      </section>
    </main>
  )
}

export default Home