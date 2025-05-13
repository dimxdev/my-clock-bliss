
import React, { useState, useEffect } from 'react';

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    // Set to Jakarta timezone (UTC+7)
    const getJakartaTime = () => {
      const date = new Date();
      const jakartaOffset = 7 * 60; // UTC+7 offset in minutes
      const utcOffset = date.getTimezoneOffset();
      const totalOffsetMinutes = jakartaOffset + utcOffset;
      
      // Create a new date with the adjusted time
      return new Date(date.getTime() + totalOffsetMinutes * 60000);
    };
    
    const timer = setInterval(() => {
      setTime(getJakartaTime());
    }, 1000);
    
    // Initial time setup
    setTime(getJakartaTime());
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  // Calculate rotation angles
  const hoursDegrees = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + partial for minutes
  const minutesDegrees = minutes * 6; // 6 degrees per minute
  const secondsDegrees = seconds * 6; // 6 degrees per second
  
  return (
    <div className="relative w-64 h-64 rounded-full border-4 border-clock-border bg-clock-face shadow-lg flex items-center justify-center">
      {/* Clock numbers */}
      {[...Array(12)].map((_, i) => {
        const rotation = i * 30;
        const isMainHour = i % 3 === 0;
        return (
          <span
            key={i}
            className={`absolute font-medium ${isMainHour ? 'text-lg text-gray-700' : 'text-sm text-gray-600'}`}
            style={{
              transform: `rotate(${rotation}deg) translate(0, -88px) rotate(-${rotation}deg)`,
            }}
          >
            {i === 0 ? '12' : i}
          </span>
        );
      })}
      
      {/* Center dot */}
      <div className="absolute w-3 h-3 bg-gray-900 rounded-full z-10"></div>
      
      {/* Hour hand */}
      <div 
        className="absolute w-1.5 rounded-full bg-clock-hour origin-bottom z-[7] transition-transform"
        style={{ 
          height: '60px',
          transform: `rotateZ(${hoursDegrees}deg)`,
          transformOrigin: 'bottom center',
          bottom: '50%',
        }}
      ></div>
      
      {/* Minute hand */}
      <div 
        className="absolute w-1 rounded-full bg-clock-minute origin-bottom z-[8] transition-transform"
        style={{ 
          height: '75px',
          transform: `rotateZ(${minutesDegrees}deg)`,
          transformOrigin: 'bottom center',
          bottom: '50%',
        }}
      ></div>
      
      {/* Second hand */}
      <div 
        className="absolute w-0.5 rounded-full bg-clock-second origin-bottom z-[9]"
        style={{ 
          height: '85px',
          transform: `rotateZ(${secondsDegrees}deg)`,
          transformOrigin: 'bottom center',
          bottom: '50%',
          transition: 'transform 0.3s cubic-bezier(0.4, 2.5, 0.5, 0.5)'
        }}
      ></div>
      
      {/* Tick marks */}
      {[...Array(60)].map((_, i) => {
        const rotation = i * 6;
        const isHourMark = i % 5 === 0;
        return (
          <div
            key={i}
            className={`absolute ${isHourMark ? 'h-2 w-1 bg-gray-600' : 'h-1 w-0.5 bg-gray-300'}`}
            style={{
              transform: `rotate(${rotation}deg) translate(0, -107px)`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default AnalogClock;
