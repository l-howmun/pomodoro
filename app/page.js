'use client'
import { useState, useEffect } from 'react';

export default function Home() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev === 0) {
            if (minutes === 0) {
              // Timer complete
              clearInterval(interval);
              playSound();
              setIsWork(!isWork);
              setMinutes(isWork ? breakDuration : focusDuration);
              return 0;
            }
            setMinutes(prevMin => prevMin - 1);
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, isWork, focusDuration, breakDuration]);

  const playSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsWork(true);
    setMinutes(25);
    setSeconds(0);
  };

  const saveSettings = () => {
    if (focusDuration < 1 || breakDuration < 1) {
      alert('Duration must be at least 1 minute');
      return;
    }
    setMinutes(focusDuration);
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
          {isEditing ? (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Timer Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Focus Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={focusDuration}
                    onChange={(e) => setFocusDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Break Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={breakDuration}
                    onChange={(e) => setBreakDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={saveSettings}
                    className="px-6 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">
                {isWork ? (
                  <span className="text-primary-500">Focus Time</span>
                ) : (
                  <span className="text-green-500">Break Time</span>
                )}
              </h1>
              <div className="text-8xl font-mono mb-8 bg-gray-700 rounded-lg p-4">
                {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
              </div>
              <div className="space-x-4">
                <button
                  onClick={toggleTimer}
                  className="px-8 py-3 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-8 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Reset
                </button>
                {!isActive && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-8 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors font-medium text-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Settings
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mt-8 text-gray-400 text-sm">
          <p>Pomodoro Technique Timer</p>
          <p>25 minutes focus, 5 minutes break</p>
        </div>
      </div>
    </main>
  );
}
