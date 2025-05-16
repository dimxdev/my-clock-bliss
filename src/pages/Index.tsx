
import React from 'react';
import AnalogClock from '@/components/AnalogClock';
import DigitalClock from '@/components/DigitalClock';
import CountdownTimer from '@/components/CountdownTimer';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:text-gray-200 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              My Clock <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(UTC+7)</span>
            </h1>
            <ThemeToggle />
          </div>
          
          <div className="mb-8 flex justify-center">
            <AnalogClock />
          </div>
          
          <div className="mb-8">
            <DigitalClock />
          </div>
          
          <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Study Timer
            </h2>
            <CountdownTimer />
          </div>
        </div>
      </div>
      
      <footer className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
        <p>Waktu Jakarta (WIB) - Designed for productive study sessions</p>
      </footer>
    </div>
  );
};

export default Index;
