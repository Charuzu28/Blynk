import React from 'react'
import TimeCircle from '../components/TimerCircle';
import ModeSelector from '../components/ModeSelector';
import { useState } from 'react';

const DURATION = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 10 * 60,

}

const Home = () => {

  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(DURATION.pomodoro);

  const getDuration = (key) => DURATION[key] || DURATION.pomodoro;
  return (
    <main className='w-full mx-auto px-4 pt-6 pb-24'>
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