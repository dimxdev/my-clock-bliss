
import React, { useState, useEffect } from 'react';

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  
  useEffect(() => {
    // Set to Jakarta timezone (UTC+7)
    const updateTime = () => {
      const now = new Date();
      const jakartaOffset = 7 * 60; // UTC+7 offset in minutes
      const utcOffset = now.getTimezoneOffset();
      const totalOffsetMinutes = jakartaOffset + utcOffset;
      
      // Create a new date with the adjusted time
      const jakartaTime = new Date(now.getTime() + totalOffsetMinutes * 60000);
      
      // Format time: HH:MM:SS
      const hours = jakartaTime.getHours().toString().padStart(2, '0');
      const minutes = jakartaTime.getMinutes().toString().padStart(2, '0');
      const seconds = jakartaTime.getSeconds().toString().padStart(2, '0');
      
      setTime(`${hours}:${minutes}:${seconds}`);
      
      // Format date: Day, DD Month YYYY
      const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      
      const day = days[jakartaTime.getDay()];
      const dayOfMonth = jakartaTime.getDate().toString().padStart(2, '0');
      const month = months[jakartaTime.getMonth()];
      const year = jakartaTime.getFullYear();
      
      setDate(`${day}, ${dayOfMonth} ${month} ${year}`);
    };
    
    // Update time immediately
    updateTime();
    
    // Update time every second
    const timer = setInterval(updateTime, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <div className="text-center">
      <div className="mb-1 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-700 dark:to-gray-800 text-white text-4xl font-semibold py-3 px-4 rounded-lg shadow-md animate-pulse-soft">
        {time}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{date}</p>
    </div>
  );
};

export default DigitalClock;
