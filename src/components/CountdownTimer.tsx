import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Timer, ArrowUp, ArrowDown } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25); // Default to 25 minutes (Pomodoro)
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
  }, []);
  
  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer completed
          clearInterval(interval as NodeJS.Timeout);
          setIsActive(false);
          setShowCompleted(true);
          
          // Play sound
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio play error:", e));
          }
          
          // Hide completed message after 5 seconds
          setTimeout(() => {
            setShowCompleted(false);
          }, 5000);
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, minutes, seconds]);
  
  // Start or resume timer
  const startTimer = () => {
    if (minutes === 0 && seconds === 0) {
      setMinutes(25); // Reset to 25 minutes if timer is at 0
    }
    setIsActive(true);
    setIsPaused(false);
  };
  
  // Pause timer
  const pauseTimer = () => {
    setIsPaused(true);
  };
  
  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setMinutes(25);
    setSeconds(0);
    setShowCompleted(false);
  };
  
  // Update minutes value
  const handleMinutesChange = (value: number[]) => {
    if (!isActive) {
      setMinutes(value[0]);
    }
  };
  
  // Format time display
  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Increment minutes
  const incrementMinutes = () => {
    if (!isActive && minutes < 60) {
      setMinutes(prev => prev + 1);
    }
  };
  
  // Decrement minutes
  const decrementMinutes = () => {
    if (!isActive && minutes > 1) {
      setMinutes(prev => prev - 1);
    }
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl shadow-inner">
      {showCompleted ? (
        <div className="text-center py-4 animate-pulse-soft">
          <h3 className="text-gray-700 dark:text-gray-200 font-semibold text-xl mb-2">Time's Up!</h3>
          <p className="text-gray-600 dark:text-gray-300">Take a break before starting again</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center mb-4">
            {!isActive ? (
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={decrementMinutes}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100 w-20 text-center">
                  {minutes}
                </div>
                <Button 
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={incrementMinutes}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
                {formatTime(minutes, seconds)}
              </div>
            )}
          </div>
          
          {!isActive && (
            <div className="mb-5 px-4">
              <Slider
                value={[minutes]}
                min={1}
                max={60}
                step={1}
                onValueChange={handleMinutesChange}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>1 min</span>
                <span>30 min</span>
                <span>60 min</span>
              </div>
            </div>
          )}
          
          <div className="flex justify-center gap-2 mt-4">
            {!isActive ? (
              <Button
                className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 gap-2 rounded-full px-6"
                onClick={startTimer}
              >
                <Play className="h-4 w-4" /> Start
              </Button>
            ) : (
              <>
                {!isPaused ? (
                  <Button
                    variant="outline"
                    className="gap-2 rounded-full px-6 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={pauseTimer}
                  >
                    <Pause className="h-4 w-4" /> Pause
                  </Button>
                ) : (
                  <Button
                    className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 gap-2 rounded-full px-6"
                    onClick={startTimer}
                  >
                    <Play className="h-4 w-4" /> Resume
                  </Button>
                )}
              </>
            )}
            
            <Button
              variant="outline"
              className="gap-2 rounded-full px-6 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={resetTimer}
            >
              <Timer className="h-4 w-4" /> Reset
            </Button>
          </div>
          
          {isActive && (
            <div className="mt-4 bg-gray-100 dark:bg-gray-600 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gray-500 dark:bg-gray-400 h-full transition-all ease-linear"
                style={{ 
                  width: `${((minutes * 60 + seconds) / (isActive ? (minutes + seconds / 60) : 25) / 60) * 100}%` 
                }}
              ></div>
            </div>
          )}
        </>
      )}
      
      <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        {isActive ? "Focus on your work 🧠" : "Set timer for your study session"}
      </div>
    </div>
  );
};

export default CountdownTimer;
